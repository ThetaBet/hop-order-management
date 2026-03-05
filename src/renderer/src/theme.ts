import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1', // Azzurro Vivido
      light: '#e1f5fe', // Ghiaccio (Container)
      dark: '#01579b',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffccbc', // Albicocca Pastello
      dark: '#ff8a65', // Corallo (per hover o testo evidenziato)
      contrastText: '#263238' // Testo scuro su fondo albicocca
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    text: {
      primary: '#263238', // Grigio Bluastro scuro
      secondary: '#546e7a' // Grigio Bluastro medio
    },
    // Colori di supporto per stati specifici
    action: {
      hover: '#e1f5fe', // Hover celeste chiarissimo
      selected: '#b3e5fc' // Selezione celeste un po' più forte
    },
    error: {
      main: '#c82f0a' // Usiamo il tuo rosso originale per gli errori/alert!
    }
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 700, color: '#0288d1' }, // Titoli Azzurri
    button: {
      fontWeight: 600,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 12 // Moderno ma non esagerato
  },
  components: {
    // 1. Bottoni: La chiave del look "Pastello"
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' }
        },
        // Stile "Tonal": Sfondo Ghiaccio, Testo Azzurro
        contained: {
          backgroundColor: '#e1f5fe',
          color: '#01579b', // Testo scuro per leggibilità
          '&:hover': {
            backgroundColor: '#b3e5fc'
          }
        },
        // Se vuoi il bottone "forte" (Primary), usa questo
        containedPrimary: {
          backgroundColor: '#0288d1',
          color: '#fff',
          '&:hover': { backgroundColor: '#0277bd' }
        }
      }
    },
    // 2. Card: Minimalismo assoluto
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(2, 136, 209, 0.08)', // Ombra azzurrina leggerissima
          border: '1px solid #f0f0f0'
        }
      }
    },
    // 3. Chip / Etichette
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500
        },
        // Le etichette secondarie sono color Albicocca!
        colorSecondary: {
          backgroundColor: '#ffccbc',
          color: '#bf360c' // Testo arancio scuro per contrasto
        },
        // Le etichette primarie sono color Ghiaccio
        colorPrimary: {
          backgroundColor: '#e1f5fe',
          color: '#01579b'
        }
      }
    },
    // 4. AppBar pulita
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Bianco semi-trasparente
          backdropFilter: 'blur(10px)', // Effetto vetro smerigliato
          color: '#263238', // Icone/Testo azzurri
          boxShadow: 'none',
          // borderBottom: '1px solid #f1f1f1'
        }
      }
    },
    // 5. DataGrid
  }
  // palette: {
  //   primary: {
  //     main: '#c82f0a'
  //   },
  //   background: {
  //     default: '#fefced',
  //     paper: '#fefced'
  //   },
  //   secondary: {
  //     main: '#2b9eb3'
  //   },
  //   error: {
  //     main: '#c82f0a'
  //   },
  //   warning: {
  //     main: '#a74f22',
  //     contrastText: '#866f3a'
  //   },
  //   info: {
  //     main: '#3e7881'
  //   },
  //   success: {
  //     main: '#44af69'
  //   }
  // }
  // palette: {
  //     primary: {
  //         main: '#416788'
  //     },
  //     secondary: {
  //         main: '#81d2c7'
  //     }
  // }
})
