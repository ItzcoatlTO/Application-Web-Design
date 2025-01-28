## Opciones de Etiquetado en Markdown

Markdown ofrece diversas opciones de etiquetado para dar formato al texto de manera sencilla. A continuación, se muestran algunas de las más utilizadas:

- **Títulos**: Utiliza la almohadilla (`#`) para crear títulos y subtítulos.
  - `# Título 1`
  - `## Título 2`
  - `### Título 3`

- **Listas**:
  - **Listas ordenadas**: Usa números seguidos de un punto.  
    `1. Elemento uno`  
    `2. Elemento dos`
  - **Listas desordenadas**: Usa guiones o asteriscos.  
    `- Elemento uno`  
    `- Elemento dos`
- **Enlaces**: Se logra encerrando el texto con corchetes y la URL con paréntesis.  
  - Ejemplo: (https://www.google.com)

Para más detalles, consulta la [documentación oficial de Markdown](https://www.markdownguide.org/)

## Comandos de Git 

Git ofrece una variedad de comandos para gestionar proyectos de manera eficiente. A continuación, se enumeran los más comunes y su utilidad:

- **Verificar el estado de un repositorio local**:  
  Utiliza `git status` para mostrar los cambios pendientes (archivos modificados, no rastreados o listos para ser confirmados).  

- **Agregar archivos al área de staging**:  
  - Para agregar un archivo individual: `git add nombre-del-archivo`  
  - Para agregar todos los archivos modificados: `git add .`  

- **Agregar comentarios al commit**:  
  Utiliza `git commit -m "Descripción breve del cambio"` para guardar los cambios en el historial con un mensaje descriptivo.  

- **Subir cambios al repositorio remoto**:  
  Usa `git push origin main` para subir los commits realizados a la rama principal (`main`).  

- **Gestionar ramas**:  
  - Crear una nueva rama: `git branch nombre-de-la-rama`  
  - Cambiar a una rama existente: `git checkout nombre-de-la-rama`  
  - Crear y cambiar automáticamente a una nueva rama: `git checkout -b nombre-de-la-rama`  
  - Listar las ramas locales: `git branch`  
  - Eliminar una rama local: `git branch -d nombre-de-la-rama`  

- **Revertir un repositorio a un commit específico**:  
  - Crear un commit que revierta los cambios posteriores: `git revert ID-del-commit`  
  - Restaurar todo a un commit anterior eliminando cambios posteriores: `git reset --hard ID-del-commit`  
  - Restaurar archivos a un commit anterior sin modificar el historial de commits: `git checkout ID-del-commit -- nombre-del-archivo`  
