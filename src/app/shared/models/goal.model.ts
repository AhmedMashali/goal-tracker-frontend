export interface Goal {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  isPublic: boolean;
  parentId: string | null;
  order: number;
  publicId?: string;
  ownerId: string;
}

export interface GoalCreateDto {
  title: string;
  description: string;
  deadline: string;
  isPublic: boolean;
  parentId?: string | null;
}

export interface GoalUpdateDto {
  title?: string;
  description?: string;
  deadline?: string;
  isPublic?: boolean;
  parentId?: string | null;
  order?: number;
}
