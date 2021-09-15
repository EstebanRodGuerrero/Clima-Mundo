const inquirer = require('inquirer');
require('colors');



    const preguntas = // OBjeto con todas las opciones 
    [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Que desea hacer?',
            choices: 
                [
                    {
                        value: '1',
                        name: `${'1'.green} Buscar`
                    },

                    {
                        value: '2',
                        name: `${'2'.green} Historial`
                    },

                    {
                        value: '0',
                        name: `${'0'.green} Salir`
                    },

                ]
        }

    ];

    const inquirerMenu = async() => { // Crea el menu principal

        console.clear();
        console.log('==========================='.green);
        console.log('  Seleccione una opcion'.white);
        console.log('===========================\n'.green);

        const { opcion } = await inquirer.prompt( preguntas );  // inquirer.prompt le pasamos la matriz preguntas
                                                                // Finalmente... desestructuramos opcion para acceder a cada uno de los elementos de aquella matriz 

        return opcion; // Ese

    }


    const buscar = async() => {
        console.log('Opcion 1');
    }

    const historial = async() => {
        console.log('Opcion 2');
    }

    const salir = async() => {
        console.log('Opcion 3');
    }


    const pausa = async() => { // Pausa la app para que no se termine al terminar cada eleccion de las opciones

        const question = 
            [
                {
                    type: 'input',
                    name: 'pause',
                    message: `\nPresione ${ 'ENTER'.green } para continuar\n`
                }
            ]

            await inquirer.prompt( question )

        return question;

    }
        

    const leerInput = async( message ) => {

        const question = 
            [
                {
                    type: 'input',
                    name: 'desc',
                    message,
                    validate( value ) { // validate verifica si el dato existe. 
                                            //  Nos da True si existe y si no, podemos decirle al usuario que hay que ingresar algo
                                            //  De la siguiente forma:

                        if( value.length === 0 ) {
                            return 'Por favor ingrese un valer valor volar jjjaa';
                        }
                        return true;

                    }
                }
            ];


        const { desc } = await inquirer.prompt(question);  // RECORDAR: Que si el objeto examinado es un arreglo, utilizar desestrucuracion antes de retornarlo ---> { desc }
        return desc;

    }

    const listarLugares = async ( lugares = [] ) => { // Le pasamos la lista de tareas en array

        const choices = lugares.map(( lugar, i )  => { // recorremos el array

            const idx = `${ i + 1 }`.green

            return { // Le damos un valor a cada uno de los campos de cada objeto extraido

                value: lugar.id,
                name: ` ${ idx }. ${ lugar.nombre } `

            }
        });


        choices.unshift({
            value: '0',
            name: '0.'.green + 'Cancelar'
        })

        const preguntas = [  // Creamos la interfaz para esta seccion
            {
                type: 'list' ,
                name: 'id' ,
                message: 'Seleccione lugar' ,
                choices
            }
        ]

        const { id } = await inquirer.prompt( preguntas );
        return id;

    }

    const confirmar = async (message) => {
        
        const question = [
            {
                type: 'confirm',
                name: 'ok',
                message
            }
        ];

        const { ok } = await inquirer.prompt( question );
        return ok;
    }



    const mostrarListadoChecklist = async ( tareas = [] ) => { // Para la opcion 5.- Tareas Completadas | Pendientes

        const choices = tareas.map(( tarea, i )  => { // recorremos el array

            const idx = `${ i + 1 }`.green

            return { // Le damos un valor a cada uno de los campos de cada objeto extraido

                value: tarea.id,
                name: ` ${ idx }. ${ tarea.desc } `,
                checked: ( tarea.completadoEn ) ? true : false

            }
        });

        const preguntas = [  // Creamos la interfaz para esta seccion
            {
                type: 'checkbox' ,
                name: 'ids' ,
                message: 'Selecciones' ,
                choices
            }
        ]

        const { ids } = await inquirer.prompt( preguntas );
        return ids;

    }

    

    
    module.exports = {
        inquirerMenu,
        pausa,
        leerInput,
        listarLugares,
        confirmar,
        mostrarListadoChecklist,
        buscar,
        historial,
        salir
    }