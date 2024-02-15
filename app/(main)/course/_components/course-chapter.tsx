import { Course, Section, dummyCourses } from "@/data";
import { useStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  MoreVertical,
  PauseCircleIcon,
  PlayCircleIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseChapter: React.FC<{
  section: Section;
}> = ({ section }) => {
  const { updateUserProgress, userProgress } = useStore();
  const params = useParams<{
    slug: string;
    restIds: [string, string];
  }>();

  const [isclick, setIsclick] = useState(false);

  // const sectionStatus =
  //   (visitedCourse && userProgress[visitedCourse?.id]?.[chapter.id]) || "not-started";

  // const handleToggleSectionStatus = () => {
  //   const newStatus =
  //     sectionStatus === "completed" ? "not-started" : "completed";
  //   if (course)
  //     updateUserProgress(course?.id, chapter.id.toString(), newStatus);
  // };

  useEffect(() => {
    console.log(isclick);
  }, [isclick]);

  return (
    <div className="relative">
      <div
        className={cn(
          " flex  items-center gap-2 px-2 rounded-md",
          section.id.toString() === params.restIds[0] && "bg-gray-200"
        )}
      >
        {/* {sectionStatus === "completed" ? (
            <CheckCircle2 className="text-green-600" />
          ) : chapterId === chapter.id.toString() ? (
            <PauseCircleIcon />
          ) : (
            <PlayCircleIcon />
          )} */}
        <Accordion type="single" collapsible className=" w-full p-0">
          {/* {section.map((section, index) => ( */}
          <AccordionItem value={section.id.toString()} className="m-0">
            <AccordionTrigger className="font-semibold">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc ml-5 grid gap-2">
                {section.lessons.map((lesson) => (
                  <Link
                    href={`/course/${params.slug}/chapter/${params.restIds[0]}/${lesson.id}`}
                    onClick={() => setIsclick(true)}
                    key={lesson.id}
                  >
                    <li>{lesson.title}</li>
                  </Link>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          {/* ))} */}
        </Accordion>
      </div>
      <div className="absolute right-2 top-5 z-10">
        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel> Progress </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sectionStatus === "completed" ? (
              <DropdownMenuItem onClick={handleToggleSectionStatus}>
                Mark as Not Completed
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleToggleSectionStatus}>
                Mark as Completed
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default CourseChapter;
