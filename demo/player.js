/* ===========================================================================
   Player for the standalone demo page (GitHub Pages).
   ---------------------------------------------------------------------------
   The composition in `film/` is the same file the website plays: it draws 88
   seconds of interface on one GSAP timeline and registers it at
   `window.__timelines["main"]`, seeking to 0. It does not play itself — on the
   site, `assets/js/film-player.js` inside the dialog advances it. This is that
   wheel, without the dialog: autoplay, play/pause, seek, keyboard, full screen.

   The film is a 1920×1080 drawing, not a layout, so it is never reflowed. The
   iframe stays 1920×1080 and a transform scales it into whatever the window
   gives it; the clip around it crops the overhang.
   =========================================================================== */
(function () {
  "use strict";

  var W = 1920;
  var H = 1080;

  var stage = document.getElementById("stage");
  var clip = document.getElementById("clip");
  var frame = document.getElementById("frame");
  var poster = document.getElementById("poster");
  var playBtn = document.getElementById("play");
  var seek = document.getElementById("seek");
  var timeEl = document.getElementById("time");
  var fsBtn = document.getElementById("fs");
  var hint = document.getElementById("hint");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  var tl = null;
  var dur = 0;
  var t = 0;
  var playing = false;
  var raf = 0;
  var last = 0;
  var resumeAfterScrub = false;

  /* ---- text and painting ------------------------------------------------ */

  function clock(seconds) {
    var s = Math.max(0, Math.round(seconds));
    return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
  }

  function paint() {
    seek.value = dur ? (t / dur) * 100 : 0;
    timeEl.textContent = clock(t) + " / " + clock(dur || 88);
  }

  function label(state) {
    playBtn.dataset.state = state;
    playBtn.setAttribute("aria-label",
      state === "replay" ? "Replay" : state === "pause" ? "Pause" : "Play");
  }

  /* ---- the clock -------------------------------------------------------- */

  function tick(now) {
    if (!playing || !tl) return;
    /* a tab that was asleep comes back with a huge delta; clamp it so the film
       resumes where it stopped instead of jumping to the end */
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    if (t >= dur) {
      t = dur;
      pause();
      label("replay");
    }
    tl.time(t);
    paint();
    if (playing) raf = requestAnimationFrame(tick);
  }

  function play() {
    if (!tl) return;
    if (t >= dur - 0.01) t = 0;
    playing = true;
    last = performance.now();
    label("pause");
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  function pause() {
    playing = false;
    cancelAnimationFrame(raf);
    label("play");
  }

  function toggle() {
    if (!tl) return;
    if (playing) pause();
    else play();
  }

  function nudge(seconds) {
    if (!tl) return;
    t = Math.min(Math.max(t + seconds, 0), dur);
    tl.time(t);
    paint();
  }

  /* ---- fitting the drawing into the window ------------------------------ */

  function fit() {
    var cs = getComputedStyle(stage);
    var availW = stage.clientWidth
      - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var availH = stage.clientHeight
      - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (!(availW > 0) || !(availH > 0)) return;

    var k = Math.min(availW / W, availH / H);
    var dpr = window.devicePixelRatio || 1;
    /* whole device pixels on the clip edge: a scaled iframe whose edge lands on
       a half pixel gets a 1px blended column, and the compositor redraws it
       while the film plays */
    clip.style.width = (Math.floor(W * k * dpr) / dpr) + "px";
    clip.style.height = (Math.floor(H * k * dpr) / dpr) + "px";
    frame.style.transform = "scale(" + k + ")";
  }

  /* ---- boot ------------------------------------------------------------- */

  function boot() {
    var attempts = 0;
    (function wait() {
      try {
        tl = frame.contentWindow.__timelines.main;
      } catch (e) {
        tl = null;
      }
      if (tl) {
        dur = tl.totalDuration();
        tl.time(0);
        paint();
        poster.style.display = "none";
        if (reduced.matches) label("play");
        else play();
        return;
      }
      /* the composition registers its timeline at the end of its own script,
         so `load` is usually enough — but a slow font can push it later */
      if (++attempts > 180) {
        hint.hidden = false;
        return;
      }
      requestAnimationFrame(wait);
    })();
  }

  /* ---- wiring ----------------------------------------------------------- */

  playBtn.addEventListener("click", function () {
    if (!tl) return;
    if (t >= dur - 0.01 && !playing) { t = 0; }
    toggle();
  });

  fsBtn.addEventListener("click", function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", function () {
    requestAnimationFrame(fit);
  });

  /* scrubbing pauses the clock and gives it back when the finger lifts */
  seek.addEventListener("pointerdown", function () {
    resumeAfterScrub = playing;
    pause();
  });
  seek.addEventListener("input", function () {
    if (!tl) return;
    t = (seek.valueAsNumber / 100) * dur;
    tl.time(t);
    paint();
  });
  function endScrub() {
    if (resumeAfterScrub) {
      resumeAfterScrub = false;
      play();
    }
  }
  seek.addEventListener("pointerup", endScrub);
  seek.addEventListener("change", endScrub);

  stage.addEventListener("click", function () {
    toggle();
  });

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var onRange = e.target === seek;
    if (e.key === " " || e.key === "k") {
      if (onRange) return;
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowRight" && !onRange) {
      e.preventDefault();
      nudge(5);
    } else if (e.key === "ArrowLeft" && !onRange) {
      e.preventDefault();
      nudge(-5);
    } else if (e.key === "f") {
      e.preventDefault();
      fsBtn.click();
    }
  });

  window.addEventListener("resize", fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(stage);

  frame.addEventListener("load", function () {
    fit();
    boot();
  });

  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
