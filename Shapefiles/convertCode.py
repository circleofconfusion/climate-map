from PyQt5.QtCore import QVariant

layer = iface.activeLayer()
layer_provider=layer.dataProvider()
layer_provider.addAttributes([QgsField("CODE",QVariant.String)])
if not layer.isEditable():
    qgis.utils.iface.actionToggleEditing().trigger()
    
codeDict = {
    11: "Af",
    12: "Am",
    13: "As",
    14: "Aw",
    21: "BWk",
    22: "BWh",
    26: "BSk",
    27: "BSh",
    31: "Cfa",
    32:  "Cfb",
    33: "Cfc",
    34: "Csa",
    35: "Csb",
    36: "Csc",
    37: "Cwa",
    38: "Cwb",
    39: "Cwc",
    41: "Dfa",
    42: "Dfb",
    43: "Dfc",
    44: "Dfd",
    45: "Dsa",
    46: "Dsb",
    47: "Dsc",
    48: "Dsd",
    49: "Dwa",
    50: "Dwb",
    51: "Dwc",
    52: "Dwd",
    61: "EF",
    62: "ET",
}

featureIterator = layer.getFeatures();
layer.updateFields();

for feature in featureIterator:
    print(".")
    layer.changeAttributeValue(feature.id(), 2, codeDict[feature.attributes()[1]])
    
    