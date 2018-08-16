module.exports = {

    packageInstaller: function(pkgs){
        // validate input

        if (typeof pkgs !== 'object') {
            return 'err: an array is required input'
        }

        // get the packages and dependencies in arrays so we can rearrange them
        let pkg = [];
        let dependency = [];
        for ( let i = 0; i < pkgs.length; i++){
            if (pkgs[i].indexOf(':') === -1) {
                return `err: item ${i} in input array is invalid`
            }else{
                let splitString = pkgs[i].split(': ')
                pkg.push(splitString[0])
                dependency.push(splitString[1])
            }
        }

        // create the installtion order
        let installOrder = []
        for ( let i = 0; i < pkg.length; i++ ){
            if ( installOrder.indexOf(pkg[i]) === -1 ){
                if (dependency[i] === '') {
                    installOrder.push(pkg[i]);
                }else{
                    installOrder.push(dependency[i]);
                    installOrder.push(pkg[i]);
                }
            }
        }

        return installOrder.join(', '); 
    }


}