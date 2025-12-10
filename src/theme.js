// import { createTheme, alpha } from '@mui/material/styles';

// // Material 3 Color Palette (unchanged)
// const m3Colors = {
//   primary: {
//     0: '#000000',
//     10: '#001d35',
//     20: '#003257',
//     30: '#00497b',
//     40: '#0062a0',
//     50: '#007bc4',
//     60: '#2d95e0',
//     70: '#54affd',
//     80: '#a0c9ff',
//     90: '#d5e3ff',
//     95: '#ebf1ff',
//     99: '#fcfcff',
//     100: '#ffffff'
//   },
//   secondary: {
//     0: '#000000',
//     10: '#1a1c1e',
//     20: '#2f3033',
//     30: '#45474a',
//     40: '#5d5e62',
//     50: '#76777b',
//     60: '#909094',
//     70: '#aaabaf',
//     80: '#c6c6ca',
//     90: '#e2e2e6',
//     95: '#f1f0f4',
//     99: '#fcfcff',
//     100: '#ffffff'
//   },
//   tertiary: {
//     0: '#000000',
//     10: '#31111d',
//     20: '#4a2532',
//     30: '#633b49',
//     40: '#7d5260',
//     50: '#986977',
//     60: '#b58392',
//     70: '#d29dac',
//     80: '#efb8c8',
//     90: '#ffd8e4',
//     95: '#ffecf1',
//     99: '#fffbff',
//     100: '#ffffff'
//   },
//   error: {
//     0: '#000000',
//     10: '#410e0b',
//     20: '#601410',
//     30: '#8c1d18',
//     40: '#b3261e',
//     50: '#dc362e',
//     60: '#e46962',
//     70: '#ec928e',
//     80: '#f2b8b5',
//     90: '#f9dedc',
//     95: '#fceeee',
//     99: '#fffbf9',
//     100: '#ffffff'
//   },
//   neutral: {
//     0: '#000000',
//     10: '#1c1b1f',
//     20: '#313033',
//     30: '#48464a',
//     40: '#605d62',
//     50: '#787579',
//     60: '#939094',
//     70: '#aeaaaf',
//     80: '#c9c5ca',
//     90: '#e6e1e6',
//     95: '#f4eff4',
//     99: '#fffbfe',
//     100: '#ffffff'
//   },
//   neutralVariant: {
//     0: '#000000',
//     10: '#1d1a22',
//     20: '#322f38',
//     30: '#49454f',
//     40: '#605d66',
//     50: '#79767f',
//     60: '#938f99',
//     70: '#aea9b4',
//     80: '#cac4d0',
//     90: '#e7e0ec',
//     95: '#f5eefa',
//     99: '#fffbfe',
//     100: '#ffffff'
//   }
// };

// const theme = createTheme({
//   colorSchemes: {
//     light: {
//       palette: {
//         primary: {
//           main: m3Colors.primary[40],
//           light: m3Colors.primary[80],
//           dark: m3Colors.primary[20],
//           contrastText: m3Colors.primary[100]
//         },
//         secondary: {
//           main: m3Colors.secondary[40],
//           light: m3Colors.secondary[80],
//           dark: m3Colors.secondary[20],
//           contrastText: m3Colors.secondary[100]
//         },
//         tertiary: {
//           main: m3Colors.tertiary[40],
//           light: m3Colors.tertiary[80],
//           dark: m3Colors.tertiary[20],
//           contrastText: m3Colors.tertiary[100]
//         },
//         error: {
//           main: m3Colors.error[40],
//           light: m3Colors.error[80],
//           dark: m3Colors.error[20],
//           contrastText: m3Colors.error[100]
//         },
//         background: {
//           default: m3Colors.neutral[99],
//           paper: m3Colors.neutral[95],
//           surface: m3Colors.neutral[95],
//           surfaceVariant: m3Colors.neutralVariant[90]
//         },
//         surface: {
//           main: m3Colors.neutral[99],
//           container: m3Colors.neutral[95],
//           containerHigh: m3Colors.neutral[90]
//         },
//         outline: {
//           main: m3Colors.neutralVariant[50],
//           variant: m3Colors.neutralVariant[80]
//         },
//         text: {
//           primary: m3Colors.neutral[10],
//           secondary: m3Colors.neutral[30],
//           disabled: m3Colors.neutral[50],
//           icon: m3Colors.neutral[40]
//         },
//         shadow: m3Colors.neutral[0]
//       }
//     },
//     dark: {
//       palette: {
//         primary: {
//           main: m3Colors.primary[80],
//           light: m3Colors.primary[90],
//           dark: m3Colors.primary[70],
//           contrastText: m3Colors.primary[10]
//         },
//         secondary: {
//           main: m3Colors.secondary[80],
//           light: m3Colors.secondary[90],
//           dark: m3Colors.secondary[70],
//           contrastText: m3Colors.secondary[10]
//         },
//         tertiary: {
//           main: m3Colors.tertiary[80],
//           light: m3Colors.tertiary[90],
//           dark: m3Colors.tertiary[70],
//           contrastText: m3Colors.tertiary[10]
//         },
//         error: {
//           main: m3Colors.error[80],
//           light: m3Colors.error[90],
//           dark: m3Colors.error[70],
//           contrastText: m3Colors.error[10]
//         },
//         background: {
//           default: m3Colors.neutral[10],
//           paper: m3Colors.neutral[20],
//           surface: m3Colors.neutral[20],
//           surfaceVariant: m3Colors.neutralVariant[30]
//         },
//         surface: {
//           main: m3Colors.neutral[10],
//           container: m3Colors.neutral[20],
//           containerHigh: m3Colors.neutral[30]
//         },
//         outline: {
//           main: m3Colors.neutralVariant[60],
//           variant: m3Colors.neutralVariant[30]
//         },
//         text: {
//           primary: m3Colors.neutral[99],
//           secondary: m3Colors.neutral[80],
//           disabled: m3Colors.neutral[50],
//           icon: m3Colors.neutral[60]
//         },
//         shadow: m3Colors.neutral[0]
//       }
//     }
//   },
//   shape: {
//     borderRadius: 0, // Changed from multiple values to 0 for all corners
//   },
//   typography: {
//     fontFamily: '"Google Sans", "Roboto", "Segoe UI", system-ui, -apple-system, sans-serif',
//     displayLarge: {
//       fontSize: '3.5625rem',
//       fontWeight: 400,
//       lineHeight: 1.16,
//       letterSpacing: '-0.015625em'
//     },
//     displayMedium: {
//       fontSize: '2.8125rem',
//       fontWeight: 400,
//       lineHeight: 1.16,
//       letterSpacing: 0
//     },
//     displaySmall: {
//       fontSize: '2.25rem',
//       fontWeight: 400,
//       lineHeight: 1.2,
//       letterSpacing: 0
//     },
//     headlineLarge: {
//       fontSize: '2rem',
//       fontWeight: 400,
//       lineHeight: 1.25,
//       letterSpacing: 0
//     },
//     headlineMedium: {
//       fontSize: '1.75rem',
//       fontWeight: 400,
//       lineHeight: 1.29,
//       letterSpacing: 0
//     },
//     headlineSmall: {
//       fontSize: '1.5rem',
//       fontWeight: 400,
//       lineHeight: 1.33,
//       letterSpacing: 0
//     },
//     titleLarge: {
//       fontSize: '1.375rem',
//       fontWeight: 400,
//       lineHeight: 1.27,
//       letterSpacing: 0
//     },
//     titleMedium: {
//       fontSize: '1rem',
//       fontWeight: 500,
//       lineHeight: 1.5,
//       letterSpacing: '0.009375em'
//     },
//     titleSmall: {
//       fontSize: '0.875rem',
//       fontWeight: 500,
//       lineHeight: 1.43,
//       letterSpacing: '0.00625em'
//     },
//     bodyLarge: {
//       fontSize: '1rem',
//       fontWeight: 400,
//       lineHeight: 1.5,
//       letterSpacing: '0.009375em'
//     },
//     bodyMedium: {
//       fontSize: '0.875rem',
//       fontWeight: 400,
//       lineHeight: 1.43,
//       letterSpacing: '0.010714em'
//     },
//     bodySmall: {
//       fontSize: '0.75rem',
//       fontWeight: 400,
//       lineHeight: 1.33,
//       letterSpacing: '0.025em'
//     },
//     labelLarge: {
//       fontSize: '0.875rem',
//       fontWeight: 500,
//       lineHeight: 1.43,
//       letterSpacing: '0.00625em'
//     },
//     labelMedium: {
//       fontSize: '0.75rem',
//       fontWeight: 500,
//       lineHeight: 1.33,
//       letterSpacing: '0.03125em'
//     },
//     labelSmall: {
//       fontSize: '0.6875rem',
//       fontWeight: 500,
//       lineHeight: 1.45,
//       letterSpacing: '0.03125em'
//     }
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           transition: 'background-color 0.3s ease',
//           overflowX: 'hidden'
//         },
//         '::selection': {
//           backgroundColor: alpha(m3Colors.primary[40], 0.3)
//         }
//       }
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           fontWeight: 500,
//           borderRadius: 0, // Changed from '20px' to 0
//           padding: '10px 24px',
//           transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
//           '&:hover': {
//             transform: 'translateY(-2px)',
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
//           },
//           '&:active': {
//             transform: 'translateY(0)'
//           }
//         },
//         contained: {
//           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
//           '&:hover': {
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
//           }
//         },
//         outlined: {
//           borderWidth: '1.5px'
//         }
//       },
//       variants: [
//         {
//           props: { variant: 'tonal' },
//           style: {
//             backgroundColor: alpha(m3Colors.secondary[80], 0.12),
//             color: m3Colors.secondary[20],
//             '&:hover': {
//               backgroundColor: alpha(m3Colors.secondary[80], 0.2)
//             }
//           }
//         },
//         {
//           props: { variant: 'elevated' },
//           style: {
//             backgroundColor: m3Colors.neutral[95],
//             color: m3Colors.primary[40],
//             boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
//             '&:hover': {
//               backgroundColor: m3Colors.neutral[90],
//               boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
//             }
//           }
//         }
//       ]
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 0, // Changed from '24px' to 0
//           backgroundImage: 'none',
//           overflow: 'hidden',
//           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//           '&:hover': {
//             transform: 'translateY(-4px)',
//             boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
//           }
//         }
//       }
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           backgroundImage: 'none',
//           borderRadius: 0 // Added borderRadius: 0
//         },
//         elevation1: {
//           boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)'
//         },
//         elevation2: {
//           boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08), 0 3px 9px rgba(0, 0, 0, 0.12)'
//         },
//         elevation3: {
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 6px 18px rgba(0, 0, 0, 0.12)'
//         }
//       }
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           backgroundImage: 'none',
//           backdropFilter: 'blur(20px)',
//           backgroundColor: alpha(m3Colors.neutral[99], 0.8),
//           borderRadius: 0 // Added borderRadius: 0
//         }
//       }
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             borderRadius: 0, // Changed from '16px' to 0
//             transition: 'all 0.2s ease',
//             '&:hover': {
//               backgroundColor: alpha(m3Colors.neutral[90], 0.4)
//             }
//           }
//         }
//       }
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           borderRadius: 0, // Changed from '8px' to 0
//           fontWeight: 500,
//           transition: 'all 0.2s ease',
//           '&:hover': {
//             transform: 'scale(1.05)'
//           }
//         }
//       }
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 0, // Changed from '12px' to 0
//           transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
//           '&:hover': {
//             transform: 'scale(1.1)',
//             backgroundColor: alpha(m3Colors.neutral[40], 0.1)
//           }
//         }
//       }
//     },
//     MuiDialog: {
//       styleOverrides: {
//         paper: {
//           borderRadius: 0, // Changed from '10px' to 0
//           backgroundImage: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1))'
//         }
//       }
//     }
//   }
// });

// export default theme;