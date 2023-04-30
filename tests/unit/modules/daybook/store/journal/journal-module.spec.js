/* eslint-disable no-unused-vars */
import { createStore } from 'vuex'
import journal from "@/modules/daybook/store/journal";
import { journalState } from '../../../../../unit/mocks/test-journal-state';

const createVuexStore = ( initialState ) => 
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState }
      }
    }
  });

describe('Vuex - Pruebas en el Journal Module', () => {

  // Basicas

  test('este es el estado inicial, debe de tener este state', () => {

    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;
    expect( isLoading ).toBeFalsy();
    expect( entries ).toEqual( journalState.entries );

  });

  //  Mutations

  test('mutation: setEntries', () => {

    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit('journal/setEntries', journalState.entries);

    expect( store.state.journal.entries.length ).toBe(2);
    expect( store.state.journal.entries.isLoading ).toBeFalsy();
  });

  test('mutation: updateEntry', () => {

    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: '-NQ6_sms5sfHWpGpyrpS',
      date: 1678385826379,
      text: 'Test vuex mutations updateEntry'
    };

    store.commit('journal/updateEntry', updatedEntry);
    const storeEntries = store.state.journal.entries;
    expect( storeEntries.length ).toBe(2);
    expect(
      storeEntries.find( e => e.id === updatedEntry.id )
    ).toEqual( updatedEntry );
  });

  test('mutation: addEntry and deleteEntry', () => {

    const store = createVuexStore(journalState);

    // Add entry
    const addEntry = {
      id: 'ABC-123',
      text: 'Test vuex mutations addEntry'
    };

    store.commit('journal/addEntry', addEntry);
    const storeEntries = store.state.journal.entries;

    expect( storeEntries.length ).toBe(3);
    expect(
      storeEntries.find(e => e.id === addEntry.id)
    ).toBeTruthy();

    // Delete entry

    store.commit('journal/deleteEntry', addEntry.id);
    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries
    ).toEqual(journalState.entries)

    expect(
      store.state.journal.entries.find(e => e.id === addEntry.id)
    ).toBeFalsy();

  });

  test('getters: getEntriesByTerm getEntryById', () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(store.getters['journal/getEntryByTerm']('').length).toBe(2);
    expect(store.getters['journal/getEntryByTerm']('café').length).toBe(1);
    expect(store.getters['journal/getEntryByTerm']('café')).toEqual([entry2]);

    // getEntryById

    expect(store.getters['journal/getEntriesById']('-NQ6_sms5sfHWpGpyrpS')).toEqual(entry1);

  });

  test('actions: loadEntries', async() => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    await store.dispatch('journal/loadEntries');
    // el toBe seria de 3 porque es lo que tengo en firebase
    expect(store.state.journal.entries.length).toBe(2);
  })

  test('actions: updateEntry', async() => {
    const store = createVuexStore(journalState);
    const updatedEntry = {
      id: '-NQ6_sms5sfHWpGpyrpS',
      date: 1678385826379,
      text: 'Hola mundo desde jest 2',
    };

    await store.dispatch('journal/updateEntry', updatedEntry);
    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual({
      id: '-NQ6_sms5sfHWpGpyrpS',
      date: 1678385826379,
      text: 'Hola mundo desde jest 2'
    });
  });

  test('actions: createEntry and deleteEntry', async() => {
    const store = createVuexStore(journalState);
    const addEntry = {
      date: 1675898024175,
      text: 'test actions createEntry'
    };
    const id = await store.dispatch('journal/createEntry', addEntry);
    expect(typeof id).toBe('string');
    expect(store.state.journal.entries.find(e => e.id === id)).toEqual({
      id,
      ...addEntry
    });

    // delete entry

    await store.dispatch('journal/deleteEntry', id);
    expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy();

  });
})