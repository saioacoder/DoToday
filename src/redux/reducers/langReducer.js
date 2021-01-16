import {getData, saveData} from '../../services/database';

// Guardar lang en localStorage
const langDB_ID = 'TODO_LANG_DB';
const langDB = getData(langDB_ID);
const defaultLanguage = langDB ? langDB : 'es';

function languageReducer(state = defaultLanguage, action) {
  switch(action.type) {
    case 'SET_LANGUAGE': {
      saveData(langDB_ID, action.payload);
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export default languageReducer;