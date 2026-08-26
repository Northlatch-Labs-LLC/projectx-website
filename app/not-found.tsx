
import { Button } from '@/components/ui/Button';
import { AuroraBackdrop, GlowBackdrop, GridBackdrop } from '@/components/ui/Backdrop';
import { Callout } from '@/components/ui/Callout';

export default function NotFound() {
  return (
    <section className="relative isolate flex w-full flex-1 items-center overflow-hidden">
      <GridBackdrop />
      <AuroraBackdrop />
      <GlowBackdrop tone="accent" position="center" />
      <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-5 py-28 sm:px-8">
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-px-cyan shadow-[0_0_10px_2px_rgba(63,216,245,0.85)]"
          />
          <span className="label bg-gradient-to-r from-px-cyan to-px-accent-200 bg-clip-text text-transparent">
            404
          </span>
          <span
            aria-hidden="true"
            className="h-px w-10 bg-gradient-to-r from-px-cyan/60 to-transparent"
          />
        </span>
        <h1 className="text-gradient-chrome max-w-[24ch] text-display">
          This page is not part of the protocol
        </h1>
        <p className="lead">
          The address you followed does not resolve to anything here.
        </p>
        <Callout
          className="mt-2 w-full"
          title="Your deposit is unaffected"
          actions={
            <>
              <Button href="/" variant="primary" className="px-5">
                Back to the home page
              </Button>
              <Button href="/interfaces" variant="secondary">
                Ways to use ProjectX
              </Button>
            </>
          }
        >
          It lives on chain, not on this website — and it is reachable from any interface,
          or directly from a terminal.
        </Callout>
      </div>
    </section>
  );
}
