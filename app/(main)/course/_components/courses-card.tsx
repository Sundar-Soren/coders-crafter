import { Course } from "@/data";
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import { BookOpen, CalendarDays, PersonStanding, User } from "lucide-react";
import Link from "next/link";
import ProgressBar from "../../_components/progress-bar";
import { useStore } from "@/hooks/store";

type CoursesCardProps = {
  course: Course;
  isDashboard?: boolean;
};

const CoursesCard: React.FC<CoursesCardProps> = ({
  course,
  isDashboard = false,
}) => {
  const { getCourseCompletionPercentage } = useStore();

  return (
    <Link href={`/course/${course.slug}`}>
      <Card className="rounded-md shadow-sm p-2">
        <CardContent className="relative h-48">
          <Image
            src={course.thumbnail}
            alt={`${course.title} Thumbnail`}
            fill
            className="object-cover rounded-lg"
          />
        </CardContent>
        <CardTitle className="text-lg py-2">{course.title}</CardTitle>
        <div className="flex gap-1 items-center font-medium">
          <BookOpen className="h-5 w-5" />
          <p>{course.sections.length} Chapters</p>
        </div>
        {isDashboard && (
          <>
            <div className="pt-5 pb-3">
              <ProgressBar value={getCourseCompletionPercentage(course.id)} />
            </div>
            <ul className="grid gap-2">
              <li className="text-sm flex gap-2">
                <User className="w-4 h-4" /> Instructor: Sundar Soren
              </li>
              <li className="text-sm flex gap-2">
                <CalendarDays className="w-4 h-4" /> Valid : 31 Mar, 2024
              </li>
            </ul>
          </>
        )}
      </Card>
    </Link>
  );
};

export default CoursesCard;
