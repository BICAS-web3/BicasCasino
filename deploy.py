import subprocess as sub

IMAGE_NAME = 'frontendrewrite'


def main():
    sub.run('git fetch', shell=True)

    update = sub.run('git pull', capture_output=True, shell=True)
    if update.stdout == b'Already up to date.\n':
        return

    sub.run(
        f'docker build -t {IMAGE_NAME} -f Dockerfile.prod .', shell=True, check=True)

    sub.run(f'docker stop {IMAGE_NAME}', shell=True)
    sub.run(f'docker rm {IMAGE_NAME}', shell=True)
    sub.run(
        f'docker run -d --name {IMAGE_NAME} --network host {IMAGE_NAME}', shell=True)
    sub.run('docker image prune', shell=True)


if __name__ == "__main__":
    main()
