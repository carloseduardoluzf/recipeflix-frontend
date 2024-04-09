export interface Page<T> {
    content: T[]; // Lista dos recursos
    totalPages: number; // Número total de páginas
    totalElements: number; // Número total de elementos
    size: number; // Tamanho da página
    number: number; // Número da página atual
    // Outras propriedades de paginação, se necessário
  }