# build all images

cd "$(dirname "$0")"
for dir in "./"*; do
  if [ ! -d $dir ]; then
    continue
  fi

  id=${dir##./}
  echo "> $id"
  name="kpj/bioman/tools/$id"

  docker build -t "$name" "$dir"
  docker tag "$name" "localhost:5000/$name"
  docker push "localhost:5000/$name"
done
