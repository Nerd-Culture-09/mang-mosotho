
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

export type BusinessRegisterInputProps={
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress: string;
    role: any;
    district: string;
    website:string;
    code:string;
};


export type LoginInputProps={
    email: string;
    password: string;
    
};