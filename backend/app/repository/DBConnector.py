import mysql.connector


class DBConnector:
    def __init__(self, host: str, port: int, user: str, password: str, database_name=""):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.database_name = database_name
        self.myDb = None
        self.createConnection()

    def createConnection(self):
        self.myDb = mysql.connector.connect(
            host=self.host,
            port=self.port,
            user=self.user,
            passwd=self.password,
            database=self.database_name,
            auth_plugin='mysql_native_password',
            buffered=True
        )
        print("Connect successfully")
        print(self.myDb.is_connected())
