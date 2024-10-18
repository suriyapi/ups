from pysnmp.hlapi import *
from pysnmp.hlapi import SnmpEngine, CommunityData, UdpTransportTarget, ContextData, ObjectType, ObjectIdentity, getCmd

def get_snmp_data(host, oid, community='public'):
    iterator = getCmd(SnmpEngine(),
                      CommunityData(community),
                      UdpTransportTarget((host, 161)),
                      ContextData(),
                      ObjectType(ObjectIdentity(oid)))

    errorIndication, errorStatus, errorIndex, varBinds = next(iterator)

    if errorIndication:
        print(errorIndication)
    elif errorStatus:
        print('%s at %s' % (errorStatus.prettyPrint(),
                            errorIndex and varBinds[int(errorIndex) - 1][0] or '?'))
    else:
        for varBind in varBinds:
            return f'{varBind[0]} = {varBind[1]}'

# Replace with the IP of your SNMP Web Pro device and the relevant OIDs
host = '192.168.1.1'  # Replace with your device IP
oid_list = [
    '1.3.6.1.2.1.33.1.2.1.0',  # Example OID for UPS description
    '1.3.6.1.2.1.33.1.4.1.0',  # Example OID for UPS input voltage
    '1.3.6.1.2.1.33.1.4.4.1.0',  # Example OID for UPS battery status
]

for oid in oid_list:
    print(get_snmp_data(host, oid))
