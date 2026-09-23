<template>
  <main class="grid min-h-[100dvh] bg-[#f4f7fb] lg:grid-cols-[minmax(28rem,0.9fr)_1.1fr]">
    <section class="relative hidden overflow-hidden bg-[#102a43] p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div class="absolute inset-y-0 right-10 w-px bg-white/10" aria-hidden="true" />
      <AppLogo class="relative [&_small]:text-blue-200 [&_strong]:text-white" />
      <div class="relative max-w-xl border-y border-white/15 py-10">
        <h1 class="max-w-lg text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.035em]">Every academic record, in its proper place.</h1>
        <p class="mt-5 max-w-md text-base leading-7 text-blue-100">A shared workspace for administration, teaching, and student self-service.</p>
      </div>
      <p class="relative text-sm text-blue-200">Secure institutional access</p>
    </section>
    <section class="grid place-items-center px-5 py-10 sm:p-12">
      <div class="w-full max-w-md"><div class="mb-8 lg:hidden"><AppLogo /></div><slot /></div>
    </section>
  </main>
</template>
