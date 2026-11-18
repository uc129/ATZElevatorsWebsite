/**
 * The Find your lift questions as one plain GET form. Without JavaScript
 * every question shows and Submit loads the result (the answers go in the
 * URL, so a result can be shared). The same single page is used with
 * JavaScript: ATZ chose not to have a one-question-at-a-time form.
 */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChoiceCard, ChoiceGroup } from "@/components/ui/choice";
import { Input } from "@/components/ui/field";
import { finderForm, finderQuestions, floorLimits, type FinderOption } from "@/content/lift-finder";
import type { FinderKey, PartialAnswers } from "@/lib/lift-finder";
import { finderIcons } from "./finder-icons";

export const finderPath = "/find-your-lift";

type OptionKey = Exclude<FinderKey, "floors">;

/** Wider grids for the longer lists of answers. */
const listColumns: Record<OptionKey, string> = {
  building: "sm:grid-cols-2",
  stage: "",
  carry: "sm:grid-cols-2",
  roof: "sm:grid-cols-3",
  city: "sm:grid-cols-2 lg:grid-cols-3",
};

function OptionQuestion({
  name,
  value,
  error,
}: {
  name: OptionKey;
  value?: string;
  error?: string;
}) {
  const question = finderQuestions[name];
  const options = question.options as readonly FinderOption[];
  return (
    <ChoiceGroup legend={question.title} error={error} listClassName={listColumns[name]}>
      {options.map((option) => {
        const Icon = option.icon ? finderIcons[option.icon] : null;
        return (
          <ChoiceCard
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            hint={option.hint}
            icon={Icon ? <Icon aria-hidden="true" /> : undefined}
            defaultChecked={value === option.value}
          />
        );
      })}
    </ChoiceGroup>
  );
}

export function LiftFinderForm({
  answers = {},
  floorsInput,
  missing = [],
}: {
  answers?: PartialAnswers;
  /** What the visitor typed for floors, kept even when it was out of range. */
  floorsInput?: string;
  /** Questions to mark, after a submit with gaps. */
  missing?: FinderKey[];
}) {
  const errorFor = (key: FinderKey) =>
    missing.includes(key) ? (key === "floors" ? finderForm.floors : finderForm.choose) : undefined;

  return (
    <form method="get" action={finderPath} noValidate className="flex flex-col gap-6">
      {missing.length > 0 ? (
        <p
          role="alert"
          className="rounded-control border border-danger-line bg-danger-light px-4 py-3 font-medium text-danger-text"
        >
          {finderForm.errorSummary(missing.length)}
        </p>
      ) : null}

      <Card tone="white" className="flex flex-col gap-10 p-6 md:p-8">
        <OptionQuestion name="building" value={answers.building} error={errorFor("building")} />
        <OptionQuestion name="stage" value={answers.stage} error={errorFor("stage")} />
        <p className="rounded-control bg-box px-4 py-3 text-muted">{finderForm.skipNote}</p>
        <OptionQuestion name="carry" value={answers.carry} error={errorFor("carry")} />
        <Input
          label={finderQuestions.floors.title}
          hint={finderQuestions.floors.hint}
          error={errorFor("floors")}
          name="floors"
          type="number"
          inputMode="numeric"
          min={floorLimits.min}
          max={floorLimits.max}
          defaultValue={floorsInput ?? answers.floors}
          className="max-w-xs"
        />
        <OptionQuestion name="roof" value={answers.roof} error={errorFor("roof")} />
        <OptionQuestion name="city" value={answers.city} error={errorFor("city")} />
      </Card>

      <div>
        <Button type="submit" size="lg">
          {finderForm.submit}
        </Button>
      </div>
    </form>
  );
}
