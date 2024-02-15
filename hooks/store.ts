import { Course, dummyCourses } from "@/data";
import { create } from "zustand";

interface Search {
  courses: Course[];
  setCourses: (newCourses: Course[]) => void;
  search: string;
  letsSearch: (by: string) => void;
  userProgress: Record<number, Record<string, string>>;
  updateUserProgress: (
    courseId: number,
    sectionId: string,
    status: string
  ) => void;
  getCourseCompletionPercentage: (courseId: number) => number;
  markSectionAsUncompleted: (courseId: number, sectionId: string) => void;
}

export const useStore = create<Search>((set) => {
  const isClientSide = typeof window !== "undefined";

  const storedUserProgress = isClientSide
    ? localStorage.getItem("userProgress")
    : null;

  const initialUserProgress = storedUserProgress
    ? JSON.parse(storedUserProgress)
    : {};

  const updateUserProgress = (
    courseId: number,
    sectionId: string,
    status: string
  ) => {
    set((state) => {
      if (!state.userProgress[courseId]) {
        state.userProgress[courseId] = {};
      }

      state.userProgress[courseId][sectionId] = status;

      localStorage.setItem("userProgress", JSON.stringify(state.userProgress));
      return { userProgress: { ...state.userProgress } };
    });
  };

  const markSectionAsUncompleted = (courseId: number, sectionId: string) => {
    updateUserProgress(courseId, sectionId, "not-started");
  };

  const getCourseCompletionPercentage = (courseId: number): number => {
    const courseProgress = initialUserProgress[courseId];
    if (!courseProgress) {
      return 0;
    }

    const completedSections = Object.values(courseProgress).filter(
      (status) => status === "completed"
    ).length;

    const course = dummyCourses.find((c) => c.id === courseId);
    const totalSections = course ? course.sections.length : 0;

    const completionPercentage =
      totalSections === 0 ? 100 : (completedSections / totalSections) * 100;

    // Round to 2 decimal places
    return Math.round(completionPercentage * 100) / 100;
  };

  return {
    courses: [],
    setCourses: (courses) => set(() => ({ courses })),
    search: "",
    letsSearch: (text) => set(() => ({ search: text })),
    userProgress: initialUserProgress,
    updateUserProgress,
    markSectionAsUncompleted,
    getCourseCompletionPercentage,
  };
});
