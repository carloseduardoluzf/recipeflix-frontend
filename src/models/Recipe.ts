export class Recipe {
    title?: string;
    description?: string;
    image?: string;
    instructions?: string;
    authorName?: string;

    constructor(title?: string, description?: string, image?: string, instructions?: string, authorName?: string) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.instructions = instructions;
        this.authorName = authorName;
    }
}