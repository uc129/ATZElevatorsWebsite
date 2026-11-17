import {
  ArrowRight,
  CircleCheck,
  CircleX,
  Info,
  MessageCircle,
  Phone,
  TriangleAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, cardStyles, FramedCard } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Input, Select, Textarea } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { VerifiedBadge } from "@/components/ui/verified-badge";

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-h4 font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export function ComponentsDemo() {
  return (
    <div className="flex flex-col gap-12">
      <Demo title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Request a quote</Button>
          <Button variant="outline">
            Compare all lifts <ArrowRight aria-hidden="true" />
          </Button>
          <Button variant="ghost">
            <Phone aria-hidden="true" /> 72570 01413
          </Button>
          <ButtonLink href="https://wa.me/917257001413" variant="whatsapp">
            <MessageCircle aria-hidden="true" /> Chat on WhatsApp
          </ButtonLink>
          <Button size="lg">Large primary</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Demo>

      <Demo title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="brand">Passenger lifts</Badge>
          <Badge tone="success">
            <CircleCheck aria-hidden="true" /> Under AMC
          </Badge>
          <Badge tone="warning">
            <TriangleAlert aria-hidden="true" /> Inspection due
          </Badge>
          <Badge tone="danger">
            <CircleX aria-hidden="true" /> Breakdown
          </Badge>
          <Badge tone="info">
            <Info aria-hidden="true" /> New
          </Badge>
          <Badge tone="neutral">Archived</Badge>
          <VerifiedBadge />
          <VerifiedBadge verified />
        </div>
        <figure className="flex w-full max-w-sm flex-col gap-2">
          <div className="relative aspect-video rounded-lg border border-line bg-tint glow-diffuse">
            <Badge tone="onPhoto" className="absolute top-3 left-3">
              Sample photo
            </Badge>
          </div>
          <figcaption className="text-sm text-muted">
            The on-photo badge labels images, such as sample photos until real ones arrive. Shown
            here on a placeholder in place of a photo.
          </figcaption>
        </figure>
      </Demo>

      <Demo title="Cards">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col gap-2 p-6">
            <Eyebrow>Box card</Eyebrow>
            <p className="text-h4 font-semibold text-navy">Annual maintenance</p>
            <p className="text-sm text-muted">Soft grey container, the default.</p>
          </Card>
          <Card tone="white" className="flex flex-col gap-2 p-6">
            <Eyebrow>White card</Eyebrow>
            <p className="text-h4 font-semibold text-navy">Modernisation</p>
            <p className="text-sm text-muted">White with a line border, for grey bands.</p>
          </Card>
          <Card interactive className="flex flex-col gap-2 p-6">
            <Eyebrow>Interactive</Eyebrow>
            <p className="text-h4 font-semibold text-navy">Hover me</p>
            <p className="text-sm text-muted">Brand-tinted lift; no movement for reduced motion.</p>
          </Card>
        </div>
      </Demo>

      <Demo title="Diffused light (from cuicui)">
        <div className="grid gap-6 rounded-lg border border-line glow-diffuse p-6 md:grid-cols-2 md:p-10">
          <Spotlight
            className={cardStyles({
              tone: "white",
              interactive: true,
              className: "flex flex-col gap-2 p-6",
            })}
          >
            <Eyebrow>Spotlight card</Eyebrow>
            <p className="text-h4 font-semibold text-navy">Move the pointer over me</p>
            <p className="text-sm text-muted">
              A faint light follows the pointer. Keyboard focus lights it too.
            </p>
          </Spotlight>
          <FramedCard interactive innerClassName="flex flex-col gap-2 p-6">
            <Eyebrow>Framed card</Eyebrow>
            <p className="text-h4 font-semibold text-navy">Two layers, soft shadow</p>
            <p className="text-sm text-muted">Grey frame, white panel, diffused shadow.</p>
          </FramedCard>
        </div>
      </Demo>

      <Demo title="Form fields">
        <form className="grid max-w-3xl gap-5 md:grid-cols-2" action="#">
          <Input label="Your name" name="name" autoComplete="name" required />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            hint="10-digit mobile number. We call back within one working day."
          />
          <Select
            label="What do you need?"
            name="need"
            placeholder="Choose one"
            options={[
              { value: "new", label: "A new lift" },
              { value: "amc", label: "Maintenance (AMC)" },
              { value: "repair", label: "Repair or breakdown" },
              { value: "modernise", label: "Modernisation" },
            ]}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            defaultValue="not-an-email"
            error="Enter an email address like name@example.com."
          />
          <Textarea
            className="md:col-span-2"
            label="Message"
            name="message"
            hint="Building type, floors and city help us reply faster."
          />
          <Input label="City" name="city" disabled defaultValue="Patna" />
        </form>
      </Demo>

      <Demo title="Tabs">
        <Tabs
          label="Lift types"
          orientation="vertical"
          items={[
            {
              id: "passenger",
              label: "Passenger",
              content: <Card className="p-6">Passenger lifts panel</Card>,
            },
            {
              id: "mrl",
              label: "Machine room-less",
              content: <Card className="p-6">MRL panel</Card>,
            },
            {
              id: "hospital",
              label: "Hospital",
              content: <Card className="p-6">Hospital lifts panel</Card>,
            },
          ]}
        />
      </Demo>

      <Demo title="Skeleton">
        <div className="flex items-center gap-4" role="status">
          <span className="sr-only">Loading</span>
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </Demo>
    </div>
  );
}
