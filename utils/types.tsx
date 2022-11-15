type note = {
  noteId: string;
  participantId: string;
  currentStatus: string;
  createdAtMillis: number;
};

type rating = {
  helpfulnessLevel: string;
  createdAtMillis: number;
  noteId: string;
  helpful: string;
  notHelpful: string;
};

type author = {
  participantId: string;
  numberOfHelpfulNotes: number;
  notes: Array<note>;
};

type notes = Array<note>;

export type { note, author, notes, rating };
