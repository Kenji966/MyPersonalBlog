export interface simpleBlogCard{
    title_EN:string;
    title_JP:string;
    title_TW:string;
    type:string;
    smallDescription_EN: string;
    smallDescription_JP: string;
    smallDescription_TW: string;
    currentSlug: string;
    titleImage:any;
}

export interface fullBlog{
    [x: string]: any;
    currentSlug: string;
    title_EN:string;
    title_JP:string;
    title_TW:string;
    type:string;
    content_EN: any;
    titleImage:any;
}