module.exports = {

    packageInstaller: function(pkgs){
        // validate input

        if (typeof pkgs !== 'object') {
            return 'err: an array is required input'
        }

        // get the packages and dependencies in arrays so we can rearrange them
        // and push unique packages onto install order
        let pkg = [];
        let dependency = [];
        for ( let i = 0; i < pkgs.length; i++){
            if (pkgs[i].indexOf(':') === -1) {
                return `err: item ${i} in input array is invalid`
            }else{
                let splitString = pkgs[i].split(':')
                pkg.push(splitString[0].trim())
                dependency.push(splitString[1].trim())
            }
        }

        // create the installtion order
        let installOrder = []
        for ( let i = 0; i < pkg.length; i++ ){
            if ( installOrder.indexOf(pkg[i]) === -1 ){
                if (dependency[i] === '') {
                    installOrder.push(pkg[i]);
                }else{
                    let dep = dependency[i]
                    let idx = i;
                    do {
                      idx = pkg.indexOf(dependency[idx])  
                    } while ((dependency[idx] !== dep) && (dependency[idx] !== ''))
                    if (dependency[idx] === '') {
                      if ( installOrder.indexOf(pkg[idx]) === -1 ){
                        installOrder.push(pkg[idx]);
                      }
                      if ( installOrder.indexOf(dep) === -1 ){
                        installOrder.push(dep)
                      }
                    }else{
                        return 'err: circular dependencies'
                    }
                    
                    
                    installOrder.push(pkg[i]);

                }
            }
        }

        return installOrder.join(', '); 
    }

}