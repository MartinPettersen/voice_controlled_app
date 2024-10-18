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
    const allRows: any[] = await db.getAllAsync('SELECT * FROM notes');

    return allRows
}

/*

export const getBook = async (isbn: number) => {
    const allRows: BookMark[] = await db.getAllAsync('SELECT * FROM books WHERE isbn = $isbn', { $isbn: isbn });
    return allRows
}

export const checkForDeletion = async (id: number) => {
    const allRows: BookMark[] = await db.getAllAsync('SELECT * FROM books WHERE id = $id AND owned = $owned AND read = $read AND want = $want', {$id: id, $owned: false, $read: false, $want: false });
    if (allRows.length > 0 ) {
        deleteBook(allRows[0].id)
    }
    return allRows
}

export const getOwnedBooks = async () => {
    const allRows: BookMark[] = await db.getAllAsync('SELECT * FROM books WHERE owned = $owned', { $owned: true });
    return allRows
}
export const getReadBooks = async () => {
    const allRows: BookMark[] = await db.getAllAsync('SELECT * FROM books WHERE read = $read', { $read: true });
    return allRows
}

export const getWishlistedBooks = async () => {
    const allRows: BookMark[] = await db.getAllAsync('SELECT * FROM books WHERE want = $want', { $want: true });
    return allRows
}

export const deleteBook = async (id: number) => {
    await db.runAsync('DELETE FROM books WHERE id = $id', { $id: id });
}

export const updateBookOwnership = async (id: number, owned: boolean) => {
    await db.runAsync('UPDATE books SET owned = ? WHERE id = ?', [owned, id])
    checkForDeletion(id)
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