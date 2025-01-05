import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

// Cargar variables de entorno desde .env
dotenv.config();

@Injectable()
export class CliService {
  private readonly GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  constructor() {
    if (!this.GITHUB_TOKEN) {
      console.error(
        'No se encontró el token de GitHub. Asegúrate de tener el archivo .env configurado.',
      );
      process.exit(1);
    }
  }

  async getRecentActivity(username: string) {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/events`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      const events = await response.json();

      // Verificamos si la respuesta es un array
      if (!Array.isArray(events)) {
        throw new Error('La respuesta no es un array de eventos.');
      }

      // Retornamos la actividad en el formato deseado
      return events.map((event: any) => ({
        type: event.type,
        repo: event.repo.name,
        date: event.created_at,
      }));
    } catch (error) {
      console.error(
        'Error al obtener la actividad del usuario:',
        error.message,
      );
      throw error;
    }
  }
}
