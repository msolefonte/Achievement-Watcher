//stripdown version of https://github.com/xan105/go-dll-regedit

package regedit

import (
	"golang.org/x/sys/windows/registry"
)

func GetHKEY(root string) registry.Key {

	var HKEY registry.Key
	
	if (root == "HKCR"){ 
    HKEY = registry.CLASSES_ROOT
	} else if (root == "HKCU") {
    HKEY = registry.CURRENT_USER
  }else if (root == "HKLM") {
  	HKEY = registry.LOCAL_MACHINE
  }else if (root == "HKU") { 
  	HKEY = registry.USERS
  }else if (root == "HKCC") { 
    HKEY = registry.CURRENT_CONFIG
	}
	
	return HKEY

}

func RegQueryStringValueAndExpand(root string, key string, name string) string { // REG_SZ & REG_EXPAND_SZ (expands environment-variable strings)

	var result string
	HKEY := GetHKEY(root)

	k, _ := registry.OpenKey(HKEY , key, registry.QUERY_VALUE)
		 defer k.Close()
		 s, _, _ := k.GetStringValue(name)
		 result, _ = registry.ExpandString(s)
 
	return result
}