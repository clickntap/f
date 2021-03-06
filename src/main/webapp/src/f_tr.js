(function () {
  var languages = {
    it: {
      'btn.checkout': 'Invia Ordine',
      'btn.yes': 'Si',
      'btn.no': 'No',
      'btn.ok': 'OK',
      'btn.back': 'Torna indietro',
      'btn.cancel': 'Annulla',
      'btn.delete': 'Elimina',
      'btn.signin': 'Accedi',
      'btn.signup': 'Iscriviti',
      'btn.signforgot': 'Recupera Password',
      'btn.signout': 'Esci',
      'goto.sign': 'Accedi',
      'goto.signin': 'Sei un utente registrato?',
      'goto.signup': 'Non hai un account? Crealo ora',
      'goto.signforgot': 'Hai dimenticato la password?',
      'label.name': 'Nome',
      'label.surname': 'Cognome',
      'label.username': 'Username',
      'label.email': 'Email',
      'label.password': 'Password',
      'label.confirmpassword': 'Conferma password',
      'label.title': 'Titolo',
      'label.description': 'Descrizione',
      'label.date': 'Data',
      'label.duedate': 'Data di scadenza',
      'label.birthdate': 'Data di nascita',
      'label.noaccess': 'No Access',
      'label.readaccess': 'Read Only',
      'label.readwriteaccess': 'Read / Write',
      'error.bad': 'Il valore inserito non è corretto',
      'error.empty': 'Il valore non può essere vuoto',
      'error.bad.email': 'La Email inserita non è corretta',
      'error.empty.email': 'È necessario inserire una Email',
      'error.tooshort': 'Il valore inserito è troppo corto',
      'error.different': 'La conferma inserita non è corretta',
      'error.conflict': 'Il valore inserito è utilizzato',
      'facebook.connect': 'Continua con Facebook',
      'tip.input.year': 'Inserisci l\'anno utilizzando 4 cifre',
      'tip.input.month': 'Inserisci il mese utilizzando un numero da 1 a 12',
      'tip.input.day': 'Inserisci il numero del giorno',
      'tip.input.hour': 'Inserisci l\'ora utilizzando un numero da 0 a 23',
      'tip.input.minute': 'Inserisci i minuti utilizzando un numero da 0 a 59'
    },
    en: {
      'message.confirm': 'Are you sure?',
      'btn.checkout': 'Checkout',
      'btn.yes': 'Yes',
      'btn.no': 'No',
      'btn.ok': 'OK',
      'btn.back': 'Back',
      'btn.edit': 'Edit',
      'btn.close': 'Close',
      'btn.saveandclose': 'Save and close',
      'btn.cancel': 'Cancel',
      'btn.delete': 'Delete',
      'btn.signin': 'Sign In',
      'btn.signup': 'Sign Up',
      'btn.signforgot': 'Forgot Password',
      'btn.signout': 'Sign Out',
      'btn.sync': 'Sync',
      'goto.sign': 'Sign',
      'goto.signin': 'Are you a registered user?',
      'goto.signup': 'Do you want to register as a new user?',
      'goto.signforgot': 'Did you forget your password?',
      'label.page': 'page',
      'label.of': 'of',
      'label.name': 'Name',
      'label.surname': 'Surname',
      'label.username': 'Username',
      'label.email': 'Email',
      'label.password': 'Password',
      'label.confirmpassword': 'Confirm password',
      'label.title': 'Title',
      'label.description': 'Description',
      'label.date': 'Date',
      'label.duedate': 'Due Date',
      'label.birthdate': 'Birth Date',
      'label.noaccess': 'No Access',
      'label.readaccess': 'Read Only',
      'label.readwriteaccess': 'Read / Write',
      'label.readwritedownloadaccess': 'Read / Write / Download',
      'label.creationdate': 'Creation Date',
      'label.startdate': 'Start Date',
      'label.enddate': 'End Date',
      'label.note': 'Notes',
      'error.bad': 'The value entered is incorrect',
      //'error.unknown': 'The value',
      'error.empty': 'A value must be entered',
      'error.bad.email': 'The Email entered is incorrect',
      'error.empty.email': 'Email must be entered',
      'error.tooshort': 'The value entered is too short',
      'error.different': 'The confirm value entered is incorrect',
      'error.conflict': 'The value entered is already used',
      'tip.input.year': 'Enter the year using a 4-digit numbers',
      'tip.input.month': 'Enter the month using a number between 1 and 12',
      'tip.input.day': 'Enter the day number',
      'tip.input.hour': 'Enter the hour using a number between 0 and 23',
      'tip.input.minute': 'Enter the minute using a number between 0 and 59'
    },
    icon: {
      'label.startdate': 'fa-calendar',
      'label.enddate': 'fa-calendar',
      'label.note': 'fa-comment',
      'btn.checkout': 'fa-shopping-basket',
      'btn.sync': 'fa-sync',
      'btn.yes': 'fa-check',
      'btn.no': 'fa-times',
      'btn.ok': 'fa-check-circle',
      'btn.edit': 'fa-pencil',
      'btn.back': 'fa-chevron-left',
      'btn.cancel': 'fa-times-circle',
      'btn.delete': 'fa-trash',
      'btn.close': 'fa-times',
      'btn.saveandclose': 'fa-check',
      'btn.signin': 'fa-sign-in',
      'btn.signout': 'fa-sign-out',
      'btn.signup': 'fa-user-plus',
      'btn.signforgot': 'fa-unlock',
      'goto.signin': 'fa-sign-in',
      'goto.signup': 'fa-user-plus',
      'goto.signforgot': 'fa-unlock',
      'label.username': 'fa-user-circle',
      'label.email': 'fa-envelope',
      'label.password': 'fa-unlock',
      'label.confirmpassword': 'fa-lock',
      'label.date': 'fa-calendar',
      'label.creationdate': 'fa-calendar-star',
      'label.duedate': 'fa-calendar-times',
      'label.birthdate': 'fa-calendar-star',
      'facebook.connect': 'fab fa-facebook-square'
      // 'label.noaccess': 'fa-ban',
      // 'label.readaccess': 'fa-eye',
      // 'label.readwriteaccess': 'fa-pen',
      // 'label.readwritedownloadaccess': 'fa-download'
    }
  };
  f().prototype().tr = function (code, texts) {
    code = code || '';
    code = code.toLowerCase();
    if (!code && !texts) {
      var language = 'it';
      try {
        language = f('html').items[0].getAttribute('lang');
      } catch (err) {
      }
      this.each(function (container) {
        f(container).find('.f-tr').each(function (item, i) {
          var code = item.getAttribute('code');
          if (!code) {
            code = item.innerText || item.textContent;
            item.setAttribute('code', code);
          }
          var item = f(item);
          item.html(item.tr(code))
        });
        f(container).find('.f-date').each(function (item, i) {
          var code = item.getAttribute('code');
          if (!code) {
            code = item.innerText || item.textContent;
            item.setAttribute('code', code);
          }
          var item = f(item);
          var date = new Date(Date.parse(code));
          var dateString = '' + date.toLocaleDateString(language, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
          dateString += ' ' + date.toLocaleTimeString(language, {
            hour12: false,
            timeStyle: 'short'
          });
          item.html(dateString)
        });
      });
    }
    try {
      if (languages[code]) {
        if (texts) {
          for (key in texts) {
            (languages[code])[key.toLowerCase()] = texts[key]
          }
        } else {
          f('html').items[0].setAttribute('lang', code);
        }
        return this;
      }
      var language = 'it';
      try {
        language = f('html').items[0].getAttribute('lang');
        if(!language) {
          language = 'it';
        }
      } catch (err) {
      }
      var label = (languages[language])[code];
      if (f().fa() != '') {
        var icon = languages.icon[code];
        if (icon) {
          if (icon.indexOf(' ') < 0) {
            icon = f().fa() + ' ' + icon;
          }
          label = '<i class="' + icon + '"></i>&nbsp;&nbsp;' + ((typeof label == 'string') ? label : code);
        }
      }
      if (!label) {
        var parts = code.split('.');
        if (parts.length == 4) {
          label = this.tr('error.' + parts[1] + '.' + parts[3]);
          if (!label) {
            return this.tr('error.' + parts[1]);
          } else {
            return label;
          }
        }
      }
      return label;
    } catch (err) {
      return code;
    }
  };
  var trPlugin = function (resolve, context) {
    f(context.div).tr();
    resolve(context);
  };
  f().uiPlugins().push(trPlugin);
})();