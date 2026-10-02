<script setup lang="ts">
import { GraduationCap, ShieldCheck } from '@lucide/vue'
</script>

<template>
  <div class="school-portal">
    <a href="#sign-in" class="skip-link">Skip to sign in</a>
    <header class="portal-header">
      <AppBrand />
      <div class="portal-header-label"><GraduationCap :size="21" :stroke-width="1.6" aria-hidden="true" /><span>Academic portal</span></div>
    </header>
    <main class="portal-main">
      <section class="campus-panel" aria-labelledby="campus-title">
        <div class="campus-introduction">
          <h2 id="campus-title">Your campus.<br> One connected community.</h2>
          <p>Learning, teaching, and everything in between.<br class="desktop-break"> Your academic life starts here.</p>
        </div>
        <figure class="campus-photo">
          <img src="/images/campus.jpg" alt="An academic building overlooking a green campus courtyard" width="1200" height="900" fetchpriority="high">
          <figcaption><GraduationCap :size="21" :stroke-width="1.6" aria-hidden="true" /><span>A place to learn. A space to grow.</span></figcaption>
        </figure>
        <div class="campus-services">
          <p>Your academic essentials, together.</p>
          <ul aria-label="Academic services"><li>Enrollment</li><li>Courses &amp; grades</li><li>Academic records</li></ul>
        </div>
      </section>
      <section id="sign-in" class="portal-sign-in" aria-label="Account sign in" tabindex="-1">
        <div class="portal-form"><slot /></div>
        <p class="portal-access"><ShieldCheck :size="16" aria-hidden="true" />For authorized members of your school community</p>
      </section>
    </main>
    <footer class="portal-footer"><span>StudentServe · Connecting your academic community</span><span>Students · Instructors · Registrars · Administrators</span></footer>
  </div>
</template>

<style scoped>
.school-portal { min-height: 100dvh; display: flex; flex-direction: column; background: #fff; color: #102a43; }
.portal-header { min-height: 104px; padding: 24px clamp(24px, 4.4vw, 72px); display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid #d8e2ef; }
.portal-header-label { display: flex; align-items: center; gap: 10px; color: #51657d; font-size: 14px; }
.portal-main { display: grid; grid-template-columns: 1.1fr 1fr; flex: 1; }
.campus-panel { min-width: 0; padding: clamp(32px, 4.4vw, 68px); background: #f4f7fb; display: flex; flex-direction: column; justify-content: center; border-right: 1px solid #d8e2ef; }
.campus-introduction h2 { margin: 0; font-size: clamp(34px, 3.4vw, 52px); line-height: 1.08; letter-spacing: -0.035em; font-weight: 600; text-wrap: balance; }
.campus-introduction p { margin-top: 20px; font-size: 17px; line-height: 1.6; color: #51657d; }
.campus-photo { margin-top: 32px; overflow: hidden; border-radius: 12px; background: #102a43; }
.campus-photo img { width: 100%; height: clamp(220px, 23vw, 320px); object-fit: cover; object-position: 50% 55%; }
.campus-photo figcaption { display: flex; align-items: center; gap: 12px; padding: 17px 22px; font-size: 15px; color: #fff; }
.campus-services { margin-top: 28px; }
.campus-services p { font-size: 14px; font-weight: 600; }
.campus-services ul { display: flex; flex-wrap: wrap; gap: 8px 0; padding: 0; margin-top: 8px; list-style: none; font-size: 14px; color: #51657d; }
.campus-services li + li::before { content: ' / '; padding-inline: 12px; color: #73869b; }
.portal-sign-in { display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 56px clamp(32px, 5.5vw, 88px); }
.portal-form { width: 100%; max-width: 400px; }
.portal-access { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 48px; font-size: 12px; color: #60728a; text-align: center; }
.portal-access svg { flex-shrink: 0; }
.portal-footer { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 20px clamp(24px, 4.4vw, 72px); border-top: 1px solid #d8e2ef; font-size: 12px; color: #60728a; }
.skip-link { position: absolute; left: 16px; top: -100px; z-index: 10; padding: 12px 20px; background: #fff; color: #084dcc; border-radius: 8px; }
.skip-link:focus { top: 12px; }
@media (min-width: 1800px) { .portal-main { width: 100%; max-width: 1700px; margin-inline: auto; border-inline: 1px solid #d8e2ef; } }
@media (max-width: 1023px) {
  .portal-header { min-height: 88px; padding: 20px 28px; }
  .campus-panel { padding: 36px 28px; }
  .campus-introduction h2 { font-size: 36px; }
  .desktop-break { display: none; }
  .portal-sign-in { padding: 40px 28px; }
  .campus-services li + li::before { padding-inline: 8px; }
}
@media (max-width: 767px) {
  .portal-header { padding: 20px 24px; }
  .portal-header-label { display: none; }
  .portal-main { display: flex; flex-direction: column; }
  .campus-panel { padding: 25px 24px; border-right: 0; border-bottom: 1px solid #d8e2ef; }
  .campus-introduction h2 { font-size: 28px; line-height: 1.15; }
  .campus-introduction h2 br { display: none; }
  .campus-introduction p { margin-top: 10px; font-size: 15px; }
  .campus-photo, .campus-services { display: none; }
  .portal-sign-in { flex: 1; padding: 36px 24px 28px; }
  .portal-access { margin-top: 28px; font-size: 11px; }
  .portal-footer { padding: 18px 24px; font-size: 11px; }
}
</style>
