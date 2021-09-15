    require('dotenv').config()
    require('colors');
    
    const { 
            leerInput, 
            pausa,
            inquirerMenu, 
            buscar,
            listarLugares,
            historial,
            salir 
        } = require("./helpers-new/inquirer-new");
        
    const { Busquedas } = require("./models-new/busqueda-new");



    const main = async() => {

        
        const busquedas = new Busquedas();
        let opt = '';

        
        do  {

            opt = await inquirerMenu();

            switch (opt) {

            //BUSCAR
                case '1':
                    // Mostrar mensaje
                        const lugar = await leerInput('Lugar: '); //Lee lo que escribio el usuario
                    
                    // Buscar los lugares
                        const lugares = await busquedas.ciudad( lugar );

                    // Seleccionar el lugar
                        const id = await listarLugares( lugares );

                        if( id === '0' ) continue;
                            const lugarSeleccionado = lugares.find( l => l.id === id );

                    // Guardar en DB
                        busquedas.agregarHistorial( lugarSeleccionado.nombre );

                    // Clima
                        const clima = await busquedas.climaLugar( lugarSeleccionado.lat, lugarSeleccionado.lng );

                    // Mostrar resultados
                        console.clear();
                        console.log('\nInformacion de la ciudad\n'.green);
                        console.log(`${'Ciudad'.green}: `, lugarSeleccionado.nombre);
                        console.log(`${'Latitud'.green}: `, lugarSeleccionado.lat);
                        console.log(`${'Longitud'.green}: `, lugarSeleccionado.lng);
                        console.log(`${'Temperatura'.green}: `,clima.temp);
                        console.log(`${'Mínima'.green}: `,clima.min);
                        console.log(`${'Máxima'.green}: `,clima.max);
                        console.log(`${'Como está el Clima'.green}: `,clima.desc);
                        
                break;



            //HISTORIAL
                case '2':

                    busquedas.historialCapitalizado.forEach( (lugar, i) => {
                        const idx = `${ i + 1 }.`.green;
                        console.log( `${ idx } ${ lugar }` );
                    })

                break;

            //SALIR
                case '0':
                    await salir();
                break;
            
            }

            await pausa();  
        } while ( opt !== '0' );

    }

    main();