import { Section } from "@/data";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      description,
      duration,
      expirationDate,
      instructor,
      slug,
      thumbnail,
      title,
      prerequisites,
      sections,
    } = await req.json();

    if (
      !description ||
      !duration ||
      !expirationDate ||
      !instructor ||
      !slug ||
      !thumbnail ||
      !title ||
      !prerequisites ||
      !sections
    ) {
      return new NextResponse("Bad Request - Missing Required Fields", {
        status: 400,
      });
    }

    const sectionsInput = sections.map((section: Section) => ({
      title: section.title,
      lessons: {
        create: section.lessons.map((lesson) => ({
          title: lesson.title,
          content: lesson.content,
          videoLink: lesson.videoLink,
          duration: lesson.duration,
        })),
      },
    }));
    const course = await db.course.create({
      data: {
        description,
        duration,
        expirationDate,
        instructor,
        slug,
        thumbnail,
        title,
        prerequisites,
        sections: {
          create: sectionsInput,
        },
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const courses = await db.course.findMany({
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
      },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
