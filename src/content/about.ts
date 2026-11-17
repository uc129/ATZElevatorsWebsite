/**
 * About page copy. Rules: founded 2002, no statistics, no people's names or
 * photos until ATZ approves them.
 */
import { company } from "./company";

export const story = [
  `${company.legalName} was incorporated in Patna in ${company.founded}. We set out to build sturdy, honestly priced lifts for the multi-storey buildings that were beginning to rise across Bihar.`,
  "Today our engineers survey, install, maintain and modernise lifts for hospitals, government buildings, schools, hotels, offices and homes, from our head office in Patna and our teams across the east.",
  "We still work the way we started: one engineer answerable for each lift, clear quotations, and a breakdown line that someone always answers.",
];

/** Values from the earlier ATZ site (Teamwork, Integrity, Dedication, Innovation). */
export const values = [
  {
    title: "Teamwork",
    text: "Survey, installation and service teams that hand over to each other, not between companies.",
  },
  {
    title: "Integrity",
    text: "Itemised quotations, no surprise charges, and parts replaced only with your approval.",
  },
  {
    title: "Dedication",
    text: "A breakdown line that is answered day and night, and engineers who come back until it is fixed.",
  },
  {
    title: "Innovation",
    text: "Gearless drives, machine-room-less designs and modern controllers, chosen where they make sense.",
  },
];

export const quality = [
  {
    title: "Built to the specification we quote",
    text: "Capacity, speed, doors and finishes match the itemised quotation you signed.",
  },
  {
    title: "Tested before handover",
    text: "Load tests and safety checks on brakes, doors, landing locks and alarms, with documents handed over.",
  },
  {
    title: "Safe from day one",
    text: "Rescue procedure training for the building, and the first maintenance visit booked at handover.",
  },
];
