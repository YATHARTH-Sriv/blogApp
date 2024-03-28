import conf from '../conf.js';
import { Client,Databases, ID } from "appwrite";

class DataBaseService{
     client=new Client();
     databases;
        constructor(){
            this.client.setEndpoint(conf.appwrite_url).setProject(conf.appwrite_project_id);
            this.database=new Databases(this.client);
        }

        async createDocument({title,slug,content,featuredimage,status,userid}){
            try {
                const created= await this.databases.createDocument(conf.appwrite_DATABASE_ID, conf.appwrite_COLLECTIONID, slug, {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid

                });
                return created;
            } catch (error) {
                throw new error;
            }
        }
        async updateDocument(slug,{title,content,featuredimage,status}){
            try {
                const update=await databases.updateDocument(conf.appwrite_DATABASE_ID, conf.appwrite_COLLECTIONID, slug,{
                    title,
                    content,
                    featuredimage,
                    status  
                });
            } catch (error) {
                throw new error;
            }
        }
        async deleteDocument(slug){
            try{
                await databases.deleteDocument(conf.appwrite_DATABASE_ID, conf.appwrite_COLLECTIONID, slug);
                return true;}
            catch(error){
                return false;
            }
        }

        async getdocument(slug){
            try {
                const yourpost=await databases.getDocument(conf.appwrite_DATABASE_ID, conf.appwrite_COLLECTIONID, slug);
                return yourpost;
            } catch (error) {
                throw new error("required post does not exist")
            }
        }

        async getlistofdocuments(query=["status","active"]){
           try {
             const listofposts= await databases.listDocuments(
                conf.appwrite_DATABASE_ID,
                conf.appwrite_COLLECTIONID,
                query
            );
            return listofposts;
           } catch (error) {
              return false;
           } 
        }

        async uploadfile(file){
            try {
                return await storage.createFile(
                    conf.appwrite_BUCKETID,
                    ID.unique(),
                    file
                );
            } catch (error) {
                return false;
            }
        }

        async deletefile(fileid){
            try {
                await this.bucket.deletefile(
                    conf.appwrite_BUCKETID,
                    fileid
                )
                return true;
            } catch (error) {
                return false;
                console.log("file could not be deleted")
            }
        }

        getfilepreview(fileid){
            return this.bucket.getFilePreview(conf.appwrite_BUCKETID, fileid);
        }

}

const database=new DataBaseService();
export default database;

