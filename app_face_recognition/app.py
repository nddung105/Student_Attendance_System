import sys

from main import Main

if __name__ == '__main__':
    app = Main()
    exit_code = app.app_exe()
    sys.exit(exit_code)
