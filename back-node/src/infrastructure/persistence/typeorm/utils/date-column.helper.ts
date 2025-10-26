const isSqlite = process.env.DB_TYPE === 'sqlite';

export const getDateColumnType = () =>
    isSqlite ? 'datetime' : 'timestamp'

export const getDateDefault = () =>
    isSqlite
        ? "(datetime('now'))"
        : 'CURRENT_TIMESTAMP'

export const getDateOnUpdate = () =>
    isSqlite ?
         "(datetime('now'))"
        : 'CURRENT_TIMESTAMP'
