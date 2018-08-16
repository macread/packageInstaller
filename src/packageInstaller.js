module.exports = {

    packageInstaller: function(pkgs){
        // validate input

        if (typeof pkgs !== 'object') {
            return 'err: an array is required input'
        }

        let pkg = [];
        let depend = [];

        for ( let i = 0; i < pkgs.length; i++){
            if (pkgs[i].indexOf(':') === -1) {
                return `err: item ${i} in input array is invalid`
            }else{
                

            }
        }

        return installOrder; 
    }

}