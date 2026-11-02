import promptSync from 'prompt-sync';
import { Tarea } from './tarea.js';

const prompt = promptSync();
const misTareas: Tarea[] = [];

function pausar() {
    prompt("Presiona cualquier tecla para continuar...");
}

function parsearEstado(letra: string): string {
    const l = letra.trim().toUpperCase();
    if (l === 'P') return 'Pendiente';
    if (l === 'E') return 'En curso';
    if (l === 'T') return 'Terminada';
    if (l === 'C') return 'Cancelada';
    return '';
}

function main() {
    console.log("¡Hola Olivia!");

    while (true) {
        console.log("\n¿Qué deseas hacer?\n");
        console.log("[1] Ver Mis Tareas.");
        console.log("[2] Buscar una Tarea.");
        console.log("[3] Agregar una Tarea.");
        console.log("[0] Salir.");
        
        let opcion = prompt("> ");

        if (opcion === "0") {
            console.log("¡Hasta luego!");
            break;
        }

        switch (opcion) {
            case "1": {
                while (true) {
                    console.log("\n¿Qué tareas deseas ver?");
                    console.log("[1] Todas");
                    console.log("[2] Pendientes");
                    console.log("[3] En curso");
                    console.log("[4] Terminadas");
                    console.log("[0] Volver");

                    let subOpcion = prompt("> ");
                    if (subOpcion === "0") break;

                    let tareasFiltradas: Tarea[] = [];
                    if (subOpcion === "1") {
                        tareasFiltradas = misTareas;
                    } else if (subOpcion === "2") {
                        tareasFiltradas = misTareas.filter(t => t.estado === "Pendiente");
                    } else if (subOpcion === "3") {
                        tareasFiltradas = misTareas.filter(t => t.estado === "En curso");
                    } else if (subOpcion === "4") {
                        tareasFiltradas = misTareas.filter(t => t.estado === "Terminada");
                    } else {
                        console.log("Opción inválida.");
                        continue;
                    }

                    if (tareasFiltradas.length === 0) {
                        console.log("\nNo hay tareas en esta categoría.");
                        pausar();
                        break;
                    }

                    console.log("\nEstas son todas tus tareas.");
                    tareasFiltradas.forEach((t, idx) => {
                        console.log(`[${idx + 1}] ${t.titulo}`);
                    });

                    console.log("\n¿Deseas ver los detalles de alguna?");
                    let seleccion = Number(prompt("Introduce el número para verla o 0 para volver: "));

                    if (seleccion === 0 || isNaN(seleccion)) break;

                    let indexReal = seleccion - 1;
                    if (indexReal >= 0 && indexReal < tareasFiltradas.length) {
                        let tareaSeleccionada: Tarea = tareasFiltradas[indexReal]!;

                        while (true) {
                            console.log("\nEsta es la tarea que elegiste.\n");
                            console.log(`${tareaSeleccionada.titulo}\n`);
                            console.log(`${tareaSeleccionada.descripcion}\n`);
                            console.log(`Estado:      ${tareaSeleccionada.estado}`);
                            console.log(`Dificultad:  ${tareaSeleccionada.obtenerDificultadVisual()}`);
                            console.log(`Vencimiento: ${tareaSeleccionada.vencimiento ? tareaSeleccionada.vencimiento : "Sin vencimiento"}`);
                            console.log(`Creación:    ${tareaSeleccionada.fechaCreacion}\n`);

                            console.log("Si deseas editarla, presiona E, o presiona 0 para volver.");
                            let accion = prompt("> ").trim();

                            if (accion === "0") {
                                break;
                            } else if (accion.toUpperCase() === "E") {
                                console.log(`\nEstás editando la tarea ${tareaSeleccionada.titulo}.`);
                                console.log("- Si deseas mantener los valores de un atributo, simplemente déjalo en blanco.");
                                console.log("- Si deseas dejar en blanco un atributo, escribe un espacio.\n");

                                let nuevaDesc = prompt("1. Ingresa la descripción: ");
                                if (nuevaDesc !== "") {
                                    tareaSeleccionada.descripcion = nuevaDesc === " " ? "" : nuevaDesc;
                                }

                                let nuevoEstInput = prompt("2. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
                                if (nuevoEstInput.trim() !== "") {
                                    let estParseado = parsearEstado(nuevoEstInput);
                                    if (estParseado) {
                                        tareaSeleccionada.cambiarEstado(estParseado);
                                    }
                                }

                                let nuevaDifInput = prompt("3. Dificultad ([1] / [2] / [3]): ");
                                if (nuevaDifInput.trim() !== "") {
                                    let difNum = Number(nuevaDifInput);
                                    if (!isNaN(difNum)) {
                                        tareaSeleccionada.dificultad = difNum;
                                    }
                                }

                                let nuevoVenc = prompt("4. Vencimiento: ");
                                if (nuevoVenc !== "") {
                                    tareaSeleccionada.vencimiento = nuevoVenc === " " ? null : nuevoVenc;
                                }

                                console.log("\n¡Datos guardados!");
                                pausar();
                                break;
                            }
                        }
                    } else {
                        console.log("Número inválido.");
                        pausar();
                    }
                }
                break;
            }

            case "2": {
                console.log("\nIntroduce el título de una Tarea para buscarla:");
                let busqueda = prompt("> ").toLowerCase().trim();

                let resultados: Tarea[] = misTareas.filter(t => t.titulo.toLowerCase().includes(busqueda));

                if (resultados.length === 0) {
                    console.log("\nNo hay tareas relacionadas con la búsqueda.");
                    pausar();
                } else {
                    console.log("\nEstas son las tareas relacionadas:");
                    resultados.forEach((t, idx) => {
                        console.log(`[${idx + 1}] ${t.titulo}`);
                    });

                    console.log("\n¿Deseas ver los detalles de alguna?");
                    let seleccion = Number(prompt("Introduce el número para verla o 0 para volver: "));

                    if (seleccion !== 0 && !isNaN(seleccion)) {
                        let indexReal = seleccion - 1;
                        if (indexReal >= 0 && indexReal < resultados.length) {
                        let tareaEncontrada: Tarea = resultados[indexReal]!;

                            while (true) {
                                console.log("\nEsta es la tarea que elegiste.\n");
                                console.log(`${tareaEncontrada.titulo}\n`);
                                console.log(`${tareaEncontrada.descripcion}\n`);
                                console.log(`Estado:      ${tareaEncontrada.estado}`);
                                console.log(`Dificultad:  ${tareaEncontrada.obtenerDificultadVisual()}`);
                                console.log(`Vencimiento: ${tareaEncontrada.vencimiento ? tareaEncontrada.vencimiento : "Sin vencimiento"}`);
                                console.log(`Creación:    ${tareaEncontrada.fechaCreacion}\n`);

                                console.log("Si deseas editarla, presiona E, o presiona 0 para volver.");
                                let accion = prompt("> ").trim();

                                if (accion === "0") {
                                    break;
                                } else if (accion.toUpperCase() === "E") {
                                    console.log(`\nEstás editando la tarea ${tareaEncontrada.titulo}.`);
                                    console.log("- Si deseas mantener los valores de un atributo, simplemente déjalo en blanco.");
                                    console.log("- Si deseas dejar en blanco un atributo, escribe un espacio.\n");

                                    let nuevaDesc = prompt("1. Ingresa la descripción: ");
                                    if (nuevaDesc !== "") {
                                        tareaEncontrada.descripcion = nuevaDesc === " " ? "" : nuevaDesc;
                                    }

                                    let nuevoEstInput = prompt("2. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
                                    if (nuevoEstInput.trim() !== "") {
                                        let estParseado = parsearEstado(nuevoEstInput);
                                        if (estParseado) {
                                            tareaEncontrada.cambiarEstado(estParseado);
                                        }
                                    }

                                    let nuevaDifInput = prompt("3. Dificultad ([1] / [2] / [3]): ");
                                    if (nuevaDifInput.trim() !== "") {
                                        let difNum = Number(nuevaDifInput);
                                        if (!isNaN(difNum)) {
                                            tareaEncontrada.dificultad = difNum;
                                        }
                                    }

                                    let nuevoVenc = prompt("4. Vencimiento: ");
                                    if (nuevoVenc !== "") {
                                        tareaEncontrada.vencimiento = nuevoVenc === " " ? null : nuevoVenc;
                                    }

                                    console.log("\n¡Datos guardados!");
                                    pausar();
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
            }

            case "3": {
                console.log("\nEstás creando una nueva tarea.\n");

                let titulo = prompt("1. Ingresa el Título: ");
                let descripcion = prompt("2. Ingresa la descripción: ");
                let estadoInput = prompt("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
                let dificultadInput = Number(prompt("4. Dificultad ([1] / [2] / [3]): "));
                let vencimiento = prompt("5. Vencimiento: ");

                let estadoFinal = parsearEstado(estadoInput) || "Pendiente";

                const nuevaTarea = new Tarea(
                    titulo, 
                    descripcion, 
                    0, 
                    vencimiento.trim() === "" ? null : vencimiento, 
                    isNaN(dificultadInput) ? 1 : dificultadInput
                );

                if (estadoFinal !== "Pendiente") {
                    nuevaTarea.cambiarEstado(estadoFinal);
                }

                misTareas.push(nuevaTarea);

                console.log("\n¡Datos guardados!");
                pausar();
                break;
            }

            default: {
                console.log("Opción inválida.");
                break;
            }
        }
    }
}

main();