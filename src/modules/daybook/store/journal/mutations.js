
export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries];
    state.isLoading = false;
}

export const updateEntry = ( state, entry ) => {
    const idx = state.entries.findIndex(e => e.id === entry.id);
    state.entries[idx] = entry;
}

export const addEntry = ( state, entry ) => {
    state.entries = [...state.entries, entry];
}

export const deleteEntry = ( state, id ) => {
    // se puede usar filter?
    const idx = state.entries.findIndex(e => e.id === id);
    state.entries.splice(idx, 1);
}