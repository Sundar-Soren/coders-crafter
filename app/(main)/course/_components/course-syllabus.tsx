import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/data";

const CourseSyllabus: React.FC<{ syllabus: Section[] }> = ({ syllabus }) => {
  return (
    <div className="p-2 mt-5">
      <div>
        <h2 className="font-bold text-xl">Course Syllabus:</h2>
        <Accordion type="single" collapsible>
          {syllabus.map((section, index) => (
            <AccordionItem value={section.id.toString()}>
              <AccordionTrigger className="font-semibold">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc ml-5 grid gap-2">
                  {section.lessons.map((lesson) => (
                    <li>{lesson.title}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default CourseSyllabus;
