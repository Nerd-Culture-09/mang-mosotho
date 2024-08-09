
export type RegisterInputProps={
    fullName: string;
    email: string;
    password: string;
    phone: string;
    location: string;
    role: any;
    linkedProfile?: string;
    facebookProfile?:string;
    twitterProfile?:string;
    instaProfile?:string;
};

export type LoginInputProps={
    email: string;
    password: string;
    
};