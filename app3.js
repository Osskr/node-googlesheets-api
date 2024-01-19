//conectando con google sheets
const { google } = require("googleapis");
//autentication



 async function getClient(){

 
 }
    

async function create() {

  // Objeto de autenticacion

  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
  });

  // crear un cliente para la autentificacion 
  const client = await auth.getClient()


  // Instancia de google Sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client })

  const resource = {
    properties: {
      title: 'nomenclador San luis 19/01/24',
    },
  };
  try {
    const spreadsheet = await googleSheets.spreadsheets.create({
      resource,
      fields: 'spreadsheetId',
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId;
    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    console.log(spreadsheetUrl);
    const drive = google.drive({ version: 'v3', auth: client });

    // Otorgar permisos a la cuenta de servicio
    await drive.permissions.create({
      resource: {
        role: 'writer',
        type: 'user',
        emailAddress: 'oscarjuarez.dev@gmail.com',
      },
      fileId: spreadsheet.data.spreadsheetId,
    });


    return spreadsheet.data;
  } catch (err) {
    console.log(err)
    throw err;
  }
} 



//obtener filas de la tabla
   async function getRows(){

    const auth = new google.auth.GoogleAuth({
        keyFile:'credentials.json',
        scopes:"https://www.googleapis.com/auth/spreadsheets"
    });

        // crear un cliente para la autentificacion 
         const client = await auth.getClient()


    // Instancia de google Sheets api
    const googleSheets = google.sheets({version:"v4",auth:client})
    const spreadsheetId = "1YjY4XPSPTfTLrBnrotPVKaG1YtoJbKF70oUaTseMFIY"


    //get metadata about spreadsheet
    const data = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })

   
//read roads from spreadsheet

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        //range: "Hoja1",
        range: "Sheet1!A:D", //obtener sola primera columna
    })

    console.log(getRows.data)

  }
  
//para escribir dataos
  async function write(){
    const auth = new google.auth.GoogleAuth({
        keyFile:'credentials.json',
        scopes:"https://www.googleapis.com/auth/spreadsheets"
    });

        // crear un cliente para la autentificacion 
         const client = await auth.getClient()


    // Instancia de google Sheets api
    const googleSheets = google.sheets({version:"v4",auth:client})
    const spreadsheetId = "1YjY4XPSPTfTLrBnrotPVKaG1YtoJbKF70oUaTseMFIY"


    const testData = [
      ['Dato1', 'Dato2', 'Dato3', 'Dato4'],
      ['Prueba1', 'Prueba2', 'Prueba3', 'Prueba4'],
      // Agrega más filas de datos de prueba según sea necesario
    ];

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        //range: "Hoja1",
        range: "Sheet1!A:D",
        valueInputOption:'USER_ENTERED', //RAW | USER_ENTERED
        resource: {
          values: testData,
      }
    })

  }  

  //create() 
  //getRows()
  write()