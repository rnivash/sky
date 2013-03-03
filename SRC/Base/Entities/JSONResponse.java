/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Base.Entities;

/**
 *
 * @author Nivash
 */
public class JSONResponse {

    public String status;
    public String pageUrl;
    public String errorMsg;
    
    public JSONResponse(){
        status = "";
        pageUrl = "";
        errorMsg = "";
    }
}
