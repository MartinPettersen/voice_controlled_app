import * as SQLite from 'expo-sqlite';



const db = SQLite.openDatabaseSync('noteDatabase.db');
export const createTables = async () => {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT,
          subject TEXT,
          content TEXT
        )`)
};


export const addNote = async (date: string, subject: string, content: string) => {
    await db.runAsync(
        'INSERT INTO notes (date, subject, content) VALUES (?, ?, ?)', [date, subject, content]);
}

export const getAllNotes = async () => {
    const allRows: Note[] = await db.getAllAsync('SELECT * FROM notes');

    return allRows
}


export const getNote = async (id: number) => {
    const allRows: Note[] = await db.getAllAsync('SELECT * FROM notes WHERE id = $id', { $id: id });
    return allRows
}


export const deleteNote = async (id: number) => {
    await db.runAsync('DELETE FROM notes WHERE id = $id', { $id: id });
}


export const updateSubject = async (id: number, subject: string) => {
    await db.runAsync('UPDATE notes SET subject = ? WHERE id = ?', [subject, id])
}


export const updateContent = async (id: number, content: string) => {
    await db.runAsync('UPDATE notes SET content = ? WHERE id = ?', [content, id])
}
/*

export const checkForDeletion = async (id: number) => {
    const allRows: BookMark[] = await db.getAllAsync('SELECT * FROM books WHERE id = $id AND owned = $owned AND read = $read AND want = $want', {$id: id, $owned: false, $read: false, $want: false });
    if (allRows.length > 0 ) {
        deleteBook(allRows[0].id)
    }
    return allRows
}




export const updateBookRead = async (id: number, read: boolean) => {
    await db.runAsync('UPDATE books SET read = ? WHERE id = ?', [read, id])
    checkForDeletion(id)
}

export const updateBookWant = async (id: number, want: boolean) => {
    await db.runAsync('UPDATE books SET want = ? WHERE id = ?', [want, id])
    checkForDeletion(id)
}

*/

createTables();