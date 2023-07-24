#!/bin/python3
import os
from sys import argv
import subprocess
import json


def main():
    print(os.getcwd())
    version = []
    package = {}

    with open('./package.json', 'r') as f:
        package = json.load(f)
        version = package['version'].split('.')
        version = [int(i) for i in version]

        if len(argv) < 2:
            print("Please add the argument 'major' 'minor' or 'path'")
            exit(1)

        match argv[1]:
            case 'major':
                version[0] += 1
                version[1] = 0
                version[2] = 0
            case 'minor':
                version[1] += 1
                version[2] = 0
            case 'patch':
                version[2] += 1
            case _:
                print("Please add the argument 'major' 'minor' or 'path'")
                exit(1)

        print(version)

    with open('./package.json', 'w') as f:
        package['version'] = '.'.join([str(i) for i in version])
        json.dump(package, f, indent=2)

    tag('.'.join([str(i) for i in version]))
    publish()


def tag(version_string):
    subprocess.run(
        ['git', 'tag', '-a' + f"v{version_string}", '-m' + f"Release {version_string}"])


def publish():
    subprocess.run(['npm', 'publish'])


if __name__ == "__main__":
    main()
