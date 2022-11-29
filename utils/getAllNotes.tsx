import { parse } from "csv-parse/sync";
import { note } from "./types";
import {
  currentYear,
  currentMonthFormatted,
  currentDayFormatted,
} from "./dates";
export default async function getAllHelpfulNotes() {
  const noteStatusHistoryUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/noteStatusHistory/noteStatusHistory-00000.tsv`;

  const res = await fetch(noteStatusHistoryUrl);
  const text = await res.text();

  const allNotes = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
  }).map((note: note) => {
    return {
      currentStatus: note.currentStatus,
      createdAtMillis: note.createdAtMillis,
      participantId: note.participantId,
      noteId: note.noteId,
    };
  });

  const helpfulNotes = allNotes.filter(
    (item: note) => item.currentStatus === "CURRENTLY_RATED_HELPFUL"
  );

  const notHelpfulNotes = allNotes.filter(
    (item: note) => item.currentStatus === "CURRENTLY_RATED_NOT_HELPFUL"
  );

  const needsMoreRatingsNotes = allNotes.filter(
    (item: note) => item.currentStatus === "NEEDS_MORE_RATINGS"
  );

  const notes = {
    allNotes: allNotes,
    helpfulNotes: helpfulNotes,
    notHelpfulNotes: notHelpfulNotes,
    needsMoreRatingsNotes: needsMoreRatingsNotes,
  };

  return notes;
}

//TODO: #22 Rename this file and function to getAllNotesStatus
