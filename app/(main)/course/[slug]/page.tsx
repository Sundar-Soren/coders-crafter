"use client";
import { Course } from "@/data";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import VideoPlayer from "@/app/(main)/_components/video-player";
import { useStore } from "@/hooks/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CourseInfo from "@/app/(main)/course/_components/course-info";
import ProgressBar from "@/app/(main)/_components/progress-bar";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const MyComponent = ({ params }: { params: { slug: string } }) => {
  const [visitedCourse, setVisitedCourse] = useState<Course>();
  const [videoUrl, setVideoUrl] = useState<string>("");

  const { courses, setCourses } = useStore();

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const selectedCourse = courses.find(
      (course) => course.slug === params.slug
    );
    if (selectedCourse) {
      setVisitedCourse(selectedCourse);
      setVideoUrl(selectedCourse.sections[0].lessons[0].videoLink);
    } else {
      fetchCourses();
    }
  }, [params.slug, courses]);

  console.log("COUD", courses);

  return (
    <div className="lg:flex gap-5 pb-5">
      <div className="w-full lg:w-7/12">
        {visitedCourse ? (
          <CourseInfo course={visitedCourse} />
        ) : (
          <>
            <Skeleton className="w-full h-[8rem] rounded-lg" />

            <Skeleton className="w-full h-[10rem] rounded-lg mt-5" />
            <Skeleton className="w-full h-[15rem] rounded-lg mt-5" />
            <Skeleton className="w-full h-[6rem] rounded-lg mt-5" />
          </>
        )}
      </div>
      <div className=" w-full lg:w-5/12 m-0">
        <div>
          <VideoPlayer videoUrl={videoUrl} />
        </div>
        <Card className="pt-4 ">
          <CardContent className="m-0">
            <h1 className="font-bold text-xl pb-4">Free</h1>
            <Link
              href={`/course/${params.slug}/chapter/${visitedCourse?.sections[0].id}`}
            >
              <Button className=" px-10 mb-2">Start Learning</Button>
            </Link>
            <ul className="text-xs grid gap-1 font-thin">
              <li>30-Day Money-Back Guarantee</li>
              <li>Full Lifetime Access</li>
            </ul>
            <Separator className="mt-4" />
            <ProgressBar value={50} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyComponent;
