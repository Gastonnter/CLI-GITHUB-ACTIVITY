import { Controller } from '@nestjs/common';
import { CliService } from './cli.service';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

@Controller()
export class CliController {
  constructor(private readonly CliService: CliService) {
    // Configurar yargs para recibir el nombre de usuario como argumento
    const argv = yargs(hideBin(process.argv))
      .option('user', {
        alias: 'u',
        type: 'string',
        description: 'Nombre de usuario de GitHub',
        demandOption: true,
      })
      .help()
      .parseSync(); // Forzar a que sea síncrono

    // Llamar al servicio para obtener la actividad
    this.getRecentActivity(argv.user);
  }

  // Método para obtener la actividad reciente del usuario
  async getRecentActivity(username: string) {
    try {
      const events = await this.CliService.getRecentActivity(username);
      events.forEach((event) => {
        console.log(
          `${event.type} en el repositorio ${event.repo} - ${event.date}`,
        );
      });
    } catch (error) {
      console.error(
        'Error al obtener la actividad del usuario:',
        error.message,
      );
    }
  }
}
