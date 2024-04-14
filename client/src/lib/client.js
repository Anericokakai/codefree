import { SanityClient } from "@sanity/client";

export const client = SanityClient({
    projectId: "q0wzqz9d",  
    dataset: "production",
    useCdn: true   ,
    apiVersion: "2024-1-16",


})