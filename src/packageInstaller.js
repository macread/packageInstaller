module.exports = {

    packageInstaller: function(pkgs){
        // validate input

        if (typeof pkgs !== 'object') {
            return 'err: an array is required input'
        }

        // get the packages and dependencies in arrays so we can rearrange them
        // and push unique packages onto install order
        // mapping the array causes the funciton to freeze when checking invalid formats
        let pkgList = [];
        let depList = [];
        for ( let i = 0; i < pkgs.length; i++){
            if (pkgs[i].indexOf(':') === -1) {
                return `err: item ${i} in input array is invalid`
            }else{
                let splitString = pkgs[i].split(':')
                pkgList.push(splitString[0].trim())
                depList.push(splitString[1].trim())
            }
        }

        // create the installtion order
        let installOrder = []
        for ( let i = 0; i < pkgList.length; i++ ){
            // only need to load a package once
            if ( installOrder.indexOf(pkgList[i]) === -1 ){  
                if (depList[i] === '') {
                    // no dependicies, put it on the list
                    installOrder.push(pkgList[i]);  // no dependicies so put it on the list
                }else{
                    // follow the dependency chain to make sure not circular
                    // and to add the last dependency
                    let dep = depList[i]
                    let idx = i;
                    do {      
                      idx = pkgList.indexOf(depList[idx])  
                    } while ((depList[idx] !== dep) && (depList[idx] !== ''))
                    if (depList[idx] === '') {
                        // add the last depeendency if not already on the list
                      if ( installOrder.indexOf(pkgList[idx]) === -1 ){
                        installOrder.push(pkgList[idx]);
                      }
                        // add the package in not already on the list
                      if ( installOrder.indexOf(dep) === -1 ){
                        installOrder.push(dep)
                      }
                    }else{
                            // circular depency, go to build the package by had.
                        return 'err: circular dependencies'
                    }

                        // no chaned dependencies so add terh package to the list
                    installOrder.push(pkgList[i]);

                }
            }
        }

        return installOrder.join(', '); 
    }

}