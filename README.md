# Proyecto Prueba Hospital

## Descripción

Este proyecto prueba consta de dos aplicaciones: un servidor API desarrollado con **Laravel** y un cliente de interfaz de usuario construido con **React**. La aplicación del servidor utiliza **Laravel Sanctum** para la autenticación y **MySQL** como base de datos, y ofrece funcionalidades de inicio de sesión y un CRUD completo para gestionar a los pacientes.

### Base de Datos

La tabla `pacientes` está estructurada de la siguiente manera:

| Campo              | Tipo de Dato   | Descripción                              |
|--------------------|----------------|------------------------------------------|
| `id`               | `bigint`       | Llave primaria, autoincrementable         |
| `nombre_completo`  | `string`       | Nombre completo del paciente              |
| `edad`             | `integer`      | Edad del paciente                         |
| `sexo`             | `enum('M', 'F')`| Sexo del paciente (`M` para masculino, `F` para femenino) |
| `fecha_nacimiento` | `date`         | Fecha de nacimiento del paciente          |
| `ciudad_origen`    | `string`       | Ciudad de origen del paciente             |
| `fecha_inscripcion`| `date`         | Fecha de inscripción en el hospital       |
| `hospital`         | `string`       | Nombre del hospital                      |
| `nombre_tutor`     | `string`       | Nombre del tutor legal                   |
| `telefono_tutor`   | `string`       | Teléfono del tutor                       |

## Aplicación del Servidor

### Tecnologías Utilizadas
- **Laravel**: Framework PHP para el desarrollo del backend.
- **Sanctum**: Para la autenticación de usuarios.
- **MySQL**: Base de datos para almacenar la información de los pacientes.

### Funcionalidades
- **API de inicio de sesión**: Permite a los usuarios iniciar sesión y obtener un token de autenticación.
- **CRUD de Pacientes**: Permite crear, leer, actualizar y eliminar registros de los pacientes con los datos requeridos.

### Capturas de Pantalla
![image](https://github.com/user-attachments/assets/274d88c7-ee9b-4da6-a9b0-64fcc829558a)
![image](https://github.com/user-attachments/assets/80c17c59-b690-4999-bbe0-a270f8aa8629)

## Aplicación del Cliente

### Tecnologías Utilizadas
- **React**
- **Vite**
- **Axios**
- **Bootstrap**
- **Bootstrap Icons**
- **SweetAlert2**
- **jsPDF**

### Funcionalidades
- Interfaz de usuario amigable para gestionar pacientes.
- Formulario de inicio de sesión.
- Visualización y gestión de pacientes (CRUD).

### Capturas de Pantalla
*Login*
![image](https://github.com/user-attachments/assets/6d9ae2cd-dd2e-48b6-8251-5ddfad1bbfe4)

*Seccion Pacientes*
![image](https://github.com/user-attachments/assets/c62c4af1-74ac-49cc-8a89-855916d2e666)
![image](https://github.com/user-attachments/assets/38bf6654-aff2-4cce-9f61-33e386bdbe9f)

*Agregar Paciente*
![image](https://github.com/user-attachments/assets/ff112764-166c-4709-9470-af427ad85ff8)

*Editar Paciente*
![image](https://github.com/user-attachments/assets/1a72b61c-84d3-4576-9a8f-558dc194625d)

*Eliminar Paciente*
![image](https://github.com/user-attachments/assets/f43da98f-d586-4bf1-922b-4d79c7a450df)
![image](https://github.com/user-attachments/assets/73910a7a-bf7b-43e1-8ecf-c9c516e0ad78)

*Generar Reporte Paciente (se adjunta pdf de prueba)*
![image](https://github.com/user-attachments/assets/23fa33fb-643e-4b56-80f0-0887b1d030f2)
![image](https://github.com/user-attachments/assets/62ff370f-bca6-4fd0-a0e8-de48019a6a80)

## Instalación

### Requisitos Previos
- PHP >= 11
- Composer
- Node.js y npm

### Instrucciones

- Clona el repositorio:
   ```bash
   git clone https://github.com/rgr0101/prueba-nativo
   cd proyecto-hospital
   cd hospital_server
   composer install

1. Servidor API:
   
- Configurar .env con nombre, password y nombre de db que se va a usar.
  ```bash
  php artisan migrate
  php artisan db:seed
  php artisan serve

2. Cliente:

  ```bash
  cd hospital_cliente
  npm install
  npm run dev



